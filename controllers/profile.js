const handleProfileGet = (req, res, postgres) => {
    const { id } = req.params;
    let found = false;
    postgres.select('*').from('users').where({
        id: id //tambien puedo poner directamente ({id}) por la propiedad y el valor es el mismo
    }).then(user => {
        if(user.length) {
        res.json(user[0]);
        } else {
            res.status(400).json('error getting user')
        }
    })
};

module.exports = {
    handleProfileGet: handleProfileGet
}