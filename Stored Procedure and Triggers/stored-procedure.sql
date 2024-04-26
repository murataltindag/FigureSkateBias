
-- if max > avg by 3+ pts, add judgename to list and loop through them to find what nationality got that highest score
DELIMITER //
CREATE PROCEDURE findBiasedJudges()
  BEGIN
    DECLARE done INT default 0;
  	DECLARE varJudgeName VARCHAR(255);
  	DECLARE varMaxScore FLOAT;
  	DECLARE varMinScore FLOAT;
  	DECLARE varAvgScore FLOAT;
  	DECLARE varSkaterNat VARCHAR(3);
    DECLARE varScore FLOAT;
    DECLARE findScores CURSOR FOR SELECT judgeName, MAX(avgScoreFromJudge), MIN(avgScoreFromJudge), AVG(avgScoreFromJudge) FROM (SELECT judgeName, judge.nationality AS judgeNat, skater.nationality AS skaterNat, AVG(avgComponentScore) AS avgScoreFromJudge FROM skater JOIN score ON name = skaterName JOIN judge ON competitionName = competition AND score.program = judge.program AND judgeRole = role GROUP BY judgeName, judge.nationality, skater.nationality) avgs GROUP BY judgeName;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    DROP TABLE IF EXISTS biases;

    CREATE TABLE biases(
      judgeName VARCHAR(255),
      judgeNat VARCHAR(255),
	    skaterNat VARCHAR(255),
	    scoreToNat FLOAT
    );

    OPEN findScores;

    REPEAT
      FETCH findScores INTO varJudgeName, varMaxScore, varMinScore, varAvgScore;
	    IF (varMaxScore - varAvgScore >= 1) THEN 
		    INSERT INTO biases (SELECT judgeName, judge.nationality, skater.nationality, AVG(avgComponentScore) AS avgScoreFromJudge
	      FROM skater JOIN score ON name = skaterName JOIN judge ON competitionName = competition AND score.program = judge.program AND judgeRole = role
		    GROUP BY judgeName, judge.nationality, skater.nationality
		    HAVING judgeName = varJudgeName AND avgScoreFromJudge = varMaxScore);
	    END IF;
	    UNTIL done
    END REPEAT;
    
    close findScores;
  END//
DELIMITER ;

-- average score judge gives skaters of different nationalities

SELECT judgeName, judge.nationality AS judgeNat, skater.nationality AS skaterNat, AVG(avgComponentScore) AS avgScoreFromJudge
FROM skater JOIN score ON name = skaterName JOIN judge ON competitionName = competition AND score.program = judge.program AND judgeRole = role
GROUP BY judgeName, judge.nationality, skater.nationality;

-- select the highest and lowest avg score a judge gives to a nationality and compare to average score they give per nationality

SELECT judgeName, MAX(avgScoreFromJudge), MIN(avgScoreFromJudge), AVG(avgScoreFromJudge)
FROM (
  SELECT judgeName, judge.nationality AS judgeNat, skater.nationality AS skaterNat, AVG(avgComponentScore) AS avgScoreFromJudge
  FROM skater JOIN score ON name = skaterName JOIN judge ON competitionName = competition AND score.program = judge.program AND judgeRole = role
  GROUP BY judgeName, judge.nationality, skater.nationality) avgs
GROUP BY judgeName

