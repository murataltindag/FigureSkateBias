# Team-Mango
# 1. Project Title
Scoring Bias of Judges in International Figure Skating
# 2. Project Summary
The purpose of our project is to shed light on the scoring bias of the judges in international
figure skating competitions, mainly based on nationality. We will analyze the data on points
given to skaters by the judges collected from such competitions.
Initial analysis will be on judges having biases for skaters from their own nationalities.
Secondary analysis will be on the positive or negative bias of certain countries for other
countries. We will make a website where the users can view and filter the data and analysis on
tables and graphs.
# 3. Description
While we are not figure skating officials, we hope to bring awareness to bias in figure skating
judging through a statistics-based approach. Biases can be seen through judges consistently
giving skaters lower or higher scores relative to other judges on the judging panel.
We will compare the points given to similar moves made by the skaters by different judges,
scores that increase the standard deviation and scores that stand out as vastly different from
other judges’ scores to the same skaters. Using this analysis, we will design a website and
showcase our results using various graphs and charts. We plan the website to be view-only,
where people can filter the data and use different methods to display it.
# 4. Usefulness
Subjective sports scoring and officiating are often biased because they are human. An example
is the 2022 Salt Lake City Olympics figure skating scandal, where the scoring investigation
resulted in judges being dismissed. Most sports scoring/officiating is generally fine (like who is the
fastest in swimming/track, who wins tennis matches, etc.), but more so for sports with an artistic
component, it is often biased because of the subjectivity of the human factor. These biases can
include factors such as politics, gender, faith, etc. Our database and analysis of the data are
designed to bring awareness to such bias and encourage discussions regarding ways to improve
scoring. Specifically, we analyze whether a particular judge will always score a player of a
particular country lower than other judges. If this is the case, is it possible to reduce the weight
of the judge's score in the overall scoring to achieve a fairer score?
This was pointed out during the 2022 Winter Olympics in Beijing (source:
https://twitter.com/SkatingScores/status/1573349500810567680?cxt=HHwWgIDR9Z7C1NUrAA
AA) , but his analysis and visualization of the data only showed the results for one skater's data
analysis. What we want to do is to combine all the scores of each judge to determine if the
judge may have bias.
# 5. Realness
Our data sources are currently decided as three data sites, the first one is
https://skatingscores.com/, the second one is https://github.com/BuzzFeedNews/figure-skatingscores/tree/master/data/json, and the last is https://github.com/BuzzFeedNews/2018-02-figureskating-analysis/tree/master/data . This data includes information about the athletes, the judges
and detailed scoring.
All we need to do is read the JSON file and insert it into the corresponding table, e.g. grab the
judges' information and insert it into table Judges. Skating scores' data is highly visualized, so
we can better understand how to analyze each part.
# Team Info

|   Info      |        Description     |
| ----------- | ---------------------- |
| TeamName    |         Mango          |
| Captain     |       Athena Zheng     |
| Captain     |  athenaz2@illinois.edu |
| Member1     |        Zepei Li        |
| Member1     |  zepeili2@illinois.edu |
| Member2     |     Murat Altindag     |
| Member2     |  murata3@illinois.edu  |
| Member3     |    Victoria Buszek     |
| Member3     |  vbuszek2@illinois.edu |
