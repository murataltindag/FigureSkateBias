var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.173.114.36',
                user: 'root',
                password: '123',
                database: 'skaters',
		multipleStatements: true
});

connection.connect;


var app = express();
app.locals.barChartHelper = require('./public/javascripts/barChartHelper.js');
// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Bias Tracker' });
});

app.get('/success', function(req, res) {
      res.send({'message': 'Skater added'});
});

/* GET skaters database */
app.get('/skaters', function(req, res) {
    var sql = 'SELECT * FROM skater';
 connection.query(sql, function(err, data, fields) {
    if (err) {
      res.send(err)
      return;
    }
    res.render('skaters', {title: 'Skaters Table', userData: data});
   });
});

// skater edit page
app.get('/skaterEdit', function(req, res) {
    res.render('skaterEdit');
});

// skater insert
app.post('/insert_skater', function(req, res) {
  var insert_name  = req.body.i_name;
  var insert_nat = req.body.i_nat;
   
  var sql = `INSERT INTO skater (name, nationality) VALUES ('${insert_name}','${insert_nat}')`;

console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/skaters');
  });
});

// skater delete
app.post('/delete_skater', function(req, res) {
  var delete_name  = req.body.d_name;
   
  var sql = `DELETE FROM skater WHERE name = '${delete_name}'`;

  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
	  res.send(err)
      return;
    }
    res.redirect('/skaters');
  });
});

// skater update
app.post('/update_skater', function(req, res) {
  var update_name  = req.body.u_name;
  var update_nat = req.body.u_nat;
   
  var sql = `UPDATE skater SET nationality = '${update_nat}' WHERE name = '${update_name}'`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/skaters');
  });
});

// skater search
app.post('/skaters-search', function(req, res) {
  var value = req.body.value;
  var attr = req.body.attribute;
  var sql = `SELECT * FROM skater WHERE ${attr} LIKE '%${value}%'`;

  connection.query(sql, function(err, data, fields) {
    if (err) {
      res.send(err)
      return;
    }
    res.render('skaters', {title: 'Skaters Table', userData: data});
   });
});


// comp page
app.get('/competitions', function(req, res) {
 var sql = 'SELECT * FROM competition';

 connection.query(sql, function(err, data, fields) {
    if (err) {
      res.send(err)
      return;
    }
    res.render('competitions', {title: 'Competition  Table', userData: data});
   });
});

//comp edit page
app.get('/compEdit', function(req, res) {
    res.render('compEdit');
});

// comp search
app.post('/competitions-search', function(req, res) {
  var value = req.body.value;
  var attr = req.body.attribute;
  var sql = `SELECT * FROM competition WHERE ${attr} LIKE '%${value}%'`;

  connection.query(sql, function(err, data, fields) {
    if (err) {
      res.send(err)
      return;
    }
    res.render('competitions', {title: 'Competitions  Table', userData: data});
   });
});

// comp insert
app.post('/insert_comp', function(req, res) {
  var insert_name  = req.body.i_name;
   
  var sql = `INSERT INTO competition (name) VALUES ('${insert_name}')`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/competitions');
  });
});

// comp delete
app.post('/delete_comp', function(req, res) {
  var delete_name  = req.body.d_name;
   
  var sql = `DELETE FROM competition WHERE name = '${delete_name}'`;
  
  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/competitions');
  });
});

// judge page
app.get('/judges', function(req, res) {
 var sql = 'SELECT * FROM judge';

 connection.query(sql, function(err, data, fields) {
    if (err) {
      res.send(err)
      return;
    }
    res.render('judges', {title: 'Judge Table', userData: data});
   });
});

// judge edit page
app.get('/judgeEdit', function(req, res) {
 res.render('judgeEdit');
});

// judge insert
app.post('/insert_judge', function(req, res) {
  var insert_name  = req.body.i_name;
  var insert_nat = req.body.i_nat;
  var insert_role = req.body.i_role;
  var insert_categ = req.body.i_cat;
  var insert_prog = req.body.i_prog;
  var insert_comp = req.body.i_comp;

  var sql = `INSERT INTO judge (judgeName, nationality, role, segmentCategory, program, competition) VALUES ('${insert_name}','${insert_nat}','${insert_role}','${insert_categ}','${insert_prog}','${insert_comp}')`;

  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/judges');
  });
});

// judges delete
app.post('/delete_judge', function(req, res) {
  var delete_name  = req.body.d_name;
 
  var sql = `DELETE FROM judge WHERE judgeName = '${delete_name}'`;

  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/judges');
  });
});

// judges update
app.post('/update', function(req, res) {
  var update_name  = req.body.u_name;
  var update_nat = req.body.u_nat;
   
  var sql = `UPDATE judge SET nationality = '${update_nat}' WHERE judgeName = '${update_name}'`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/update_success');
  });
});

// judges search
app.post('/judges-search', function(req, res) {
  var value = req.body.value;
  var attr = req.body.attribute;
  var sql = `SELECT * FROM judge WHERE ${attr} LIKE '%${value}%'`;

  connection.query(sql, function(err, data, fields) {
    if (err) {
      res.send(err)
      return;
    }
    res.render('judges', {title: 'Judge  Table', userData: data});
   });
});


// getting advanced queries in table format
app.get('/advancedQueries', function(req, res) {
 var query1  = 'SELECT judgeName, judge.nationality AS judgeNat, skater.nationality AS skaterNat, AVG(avgComponentScore) AS avgScoreFromJudge FROM skater JOIN score ON name = skaterName JOIN judge ON competitionName = competition AND score.program = judge.program AND judgeRole = role GROUP BY judgeName, judge.nationality, skater.nationality;';
 var query2 = 'SELECT judgeName, MAX(avgScoreFromJudge) AS maxScore, MIN(avgScoreFromJudge) AS minScore, AVG(avgScoreFromJudge) AS avgScore FROM ( SELECT judgeName, judge.nationality AS judgeNat, skater.nationality AS skaterNat, AVG(avgComponentScore) AS avgScoreFromJudge FROM skater JOIN score ON name = skaterName JOIN judge ON competitionName = competition AND score.program = judge.program AND judgeRole = role GROUP BY judgeName, judge.nationality, skater.nationality) avgs GROUP BY judgeName;';

   connection.query(query1, function(err, data1, fields1) {
      if (err) {
        res.send(err)
        return;
      }

      connection.query(query2, function(err, data2, fields2) {
       if (err) {
         res.send(err)
         return;
       }

       res.render('advancedQueries', {title: 'Advanced Queries', query1: data1, query2: data2});
      });
   });
});

// getting default specific bias in graph format
app.get('/advancedQueriesVisual', function(req, res) {
 var query1  = 'SELECT judgeName, judge.nationality AS judgeNat, skater.nationality AS skaterNat, AVG(avgComponentScore) AS avgScoreFromJudge FROM skater JOIN score ON name = skaterName JOIN judge ON competitionName = competition AND score.program = judge.program AND judgeRole = role GROUP BY judgeName, judge.nationality, skater.nationality HAVING judgeName  = "Mr. Alexei BELETSKI";';
 var query2 = 'SELECT DISTINCT judgeName FROM judge;';

   connection.query(query1, function(err, data, fields1) {
      if (err) {
        res.send(err)
        return;
      }

      connection.query(query2, function(err, judges, fields2) {
       if (err) {
         res.send(err)
         return;
       }

       res.render('advancedQueriesVisual', {title: 'Advanced Queries Visual', query1: data, query2: judges});
      });
   });
});


// getting selected judge bias in graph format
app.post('/advancedQueriesVisual-select', function(req, res) {
 var name = req.body.judgeName
 var query1 = `SELECT judgeName, judge.nationality AS judgeNat, skater.nationality AS skaterNat, AVG(avgComponentScore) AS avgScoreFromJudge FROM skater JOIN score ON name = skaterName JOIN judge ON competitionName = competition AND score.program = judge.program AND judgeRole = role WHERE judgeName = '${name}' GROUP BY judgeName, judge.nationality, skater.nationality;`;
 var query2 = 'SELECT DISTINCT judgeName FROM judge;';

   connection.query(query1, function(err, data, fields1) {
      if (err) {
        res.send(err)
        return;
      }

      connection.query(query2, function(err, judges, fields2) {
       if (err) {
         res.send(err)
         return;
       }

       res.render('advancedQueriesVisual', {title: 'Advanced Queries Visual', query1: data, query2: judges});
      });
   });
});

app.get('/biasedJudges', function(req, res) {
 var procedure  = 'CALL findBiasedJudges()';
 var query = 'SELECT * FROM biases'

 connection.query(procedure, function(err, data, fields1) {
      if (err) {
        res.send(err)
        return;
      }

      connection.query(query, function(err, data1, fields2) {
       if (err) {
         res.send(err)
         return;
       }
	res.render('biasedJudges', {title: 'Biased Judges', query: data1});
      });
 });
});


// this code is executed when a user clicks the form submit button
app.post('/mark', function(req, res) {
  var name  = req.body.name;
   
  var sql = `INSERT INTO skater (name, nationality) VALUES ('${name}','NAT')`;



console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/success');
  });
});



app.listen(80, function () {
    console.log('Node app is running on port 80');

});
