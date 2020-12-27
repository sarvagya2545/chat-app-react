module.exports = {
    signup: (req,res) => {
        try {
            console.log(req.body);
        } catch (error) {
            console.log(error);
        }
    }
}