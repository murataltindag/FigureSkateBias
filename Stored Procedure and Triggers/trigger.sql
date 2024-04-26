-- trigger before insert judge. if the competition judge is judging at exists, insert it.

DELIMITER //

CREATE TRIGGER InsertJudgeTrig
  BEFORE INSERT ON judge
    FOR EACH ROW
  BEGIN 
    SET @exists = (SELECT name FROM competition WHERE name = new.competition);

    IF @exists IS NULL THEN
      INSERT INTO judge(judgeName,nationality,role,segmentCategory,program,competition)
      VALUES (new.judgeName,new.nationality,new.role,new.segmentCategory,new.program,new.competition);
    END IF;

  END;

DELIMITER ;