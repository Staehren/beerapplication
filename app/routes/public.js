module.exports = function(router){
  console.log("Loading public router");
  router.post('/upload', function(req, res) {
    console.log("router /upload");
    /*
    console.log(req.body);
    console.log(req.files);
    res.json({success: true});
    */
  });

};
