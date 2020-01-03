const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({message:"succes"});
})

module.exports = router;