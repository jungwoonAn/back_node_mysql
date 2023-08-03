var express = require('express');
var router = express.Router();
var db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


//게시글 목록
router.get('/posts', function(req, res){
    var page=parseInt(req.query.page);
    var start = (page-1) * 5;
    var sql='select * from posts order by id desc limit ?, 5';
    db.get().query(sql, [start], function(err, rows){
        res.send(rows);
    });
})

//게시글 수
router.get('/posts/total', function(req, res) {
    var sql='select count(*) cnt from posts';
    db.get().query(sql, function(error, rows) {
        res.send({
            total:rows[0].cnt
        });
    });
});

//게시글 등록
router.post('/posts/insert', function(req, res) {
    var title=req.body.title;
    var body=req.body.body;
    var writer=req.body.writer;
    console.log(title, body, writer);
    var sql='insert into posts(title, body, writer) values(?,?,?)';
    db.get().query(sql, [title, body, writer], function(err, rows){
        res.sendStatus(200);
    });
});

//게시글 읽기
router.get("/posts/read/:id", function(req, res) {
    var id=req.params.id;
    var sql='select * from posts where id=?';
    db.get().query(sql, [id], function(error, rows) {
        res.send(rows[0]);
    });
});


//게시글 수정
router.post("/posts/update", function(req, res) {
    var id=req.body.id;
    var title=req.body.title;
    var body=req.body.body;
    var sql='update posts set title=?, body=? where id=?';
    db.get().query(sql, [title, body, id], function(error, rows){
        res.sendStatus(200);
    });
});

//게시글 삭제
router.post("/posts/delete/:id", function(req, res) {
    var id=req.params.id;
    var sql='delete from posts where id=?';
    db.get().query(sql, [id], function(error, rows){
        res.sendStatus(200);
    });
});

module.exports = router;
