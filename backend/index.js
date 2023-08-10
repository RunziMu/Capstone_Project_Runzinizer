const express = require('express');
const app = express();
const config = require('./config');
const User = require('./models/user');
const Category = require('./models/category');
const Expense = require('./models/expense');
const Income = require('./models/income');
const Budget = require('./models/budget');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
app.use(cors());

// Budget belongs to a User
Budget.belongsTo(User, {
    foreignKey: 'user_id'
});

// Budget belongs to a Category
Budget.belongsTo(Category, {
    foreignKey: 'cate_id'
});

// Category has many Budgets
Category.hasMany(Budget, {
    foreignKey: 'cate_id'
});

// Expense belongs to a User
Expense.belongsTo(User, {
    foreignKey: 'user_id'
});
// Expense belongs to a Category
Expense.belongsTo(Category, {
    foreignKey: 'cate_id'
});

// User has many Budgets
User.hasMany(Budget, {
    foreignKey: 'user_id'
});

// User has many Expenses
User.hasMany(Expense, {
    foreignKey: 'user_id'
});

// Income belongs to a User
Income.belongsTo(User, {
    foreignKey: 'user_id'
});

// Income belongs to a Category
Income.belongsTo(Category, {
    foreignKey: 'cate_id'
});

// User has many Incomes
User.hasMany(Income, {
    foreignKey: 'user_id'
});

// User belongs to many Categories through Budgets as a junction table
User.belongsToMany(Category, {
    through: Budget,
    foreignKey: 'user_id',
    otherKey: 'cate_id'
});

// Category belongs to many Users through Budgets as a junction table
Category.belongsToMany(User, {
    through: Budget,
    foreignKey: 'cate_id',
    otherKey: 'user_id'
});

app.use(express.urlencoded({ extended: false })); // always add this when editing data to format the data make it readable. Like encrypt data.
app.use(express.json()); // Use this when using Json raw
app.use(express.static('uploads')); //made uploads folder public

// config multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// Test DB connection

config.authenticate().then(() => {
    console.log('Database is connected.')
}).catch((err) => {
    console.log(err);
});

//Register route

app.post('/register', upload.single('image'), function (req, res) {
    let clearTextPassword = req.body.password;
    let salt = 10;

    //Convert the clear text password to a hash value
    bcrypt.hash(clearTextPassword, salt, function (err, passwordHash) {
        let user_data = req.body;
        user_data.password = passwordHash; //replace clear text password with hash value

        if (req.file) {
            user_data.image = req.file.filename;
        }

        //Create user in database
        User.create(user_data).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(500).send(err);
        });
    });
});

//Login route
app.post('/login', function (req, res) {
    let emailAddress = req.body.email;
    let clearTextPassword = req.body.password;

    //Find a user using the email address
    let data = {
        where: { email: emailAddress }
    };

    User.findOne(data).then((result) => {
        //Check if user was found in DB
        if (result) {
            // Compare clear text password to the hash value that was stored in DB
            bcrypt.compare(clearTextPassword, result.password, function (err, output) {
                if (output) {
                    res.status(200).send(result);
                } else {
                    res.status(401).send('Incorrect password');
                }
            });

        } else {
            res.status(404).send('User does not exist.')
        }

    }).catch((err) => {
        res.status(500).send(err);
    });
});


app.get('/user', function (req, res) {
    User.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.get('/category', function (req, res) {
    Category.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.get('/category/:cate_id', function (req, res) {
    let cateId = req.params.cate_id;
    Category.findByPk(cateId).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
})

app.get('/expense', function (req, res) {
    Expense.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Filter Expense by Category http://localhost:3000/filter?cate_id=3
app.get('/expense/filter', function (req, res) { 
    let data = {
        include: [Category],
        where: { cate_id: req.params.cate_id }
    };
    if (req.query.cate_id !== undefined) {
        data.where.cate_id = req.query.cate_id;
    }
    Expense.findAll(data)
    .then((results) => {
        res.status(200).send(results);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
});

app.post('/expense', function (req, res) {
    let expenseData = req.body;
    Expense.create(expenseData).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
})

// Get expense with category by user_id.
app.get('/expense/:user_id', function (req, res) {
    let data = {
        include: [User, Category],
        where: { user_id: req.params.user_id }
    }
    Expense.findAll(data).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.put('/expense/:expense_id', function (req, res) {
    let expenseId = req.params.expense_id;
    Expense.findByPk(expenseId).then((result) => {
        if (result) {
            Object.assign(result, req.body);
            result.save().then(() => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Transaction not found')
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
})

// Add expense from specific user_id.
app.post('/expense/:user_id', function (req, res) {
    let expenseData = req.body; // aware: body
    Expense.create(expenseData).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
})

// Delete an expense row
app.delete('/expense/:expense_id', function (req, res) {
    let expenseId = parseInt(req.params.expense_id); // aware: params (you must to do, mandatory... not optional) Remember to ParseInt.
    Expense.findByPk(expenseId).then((result) => { // find the expense based on the expenseID
        if (result) {
            result.destroy().then(() => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Expense not found.')
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
})

app.get('/income', function (req, res) {
    Income.findAll().then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.post('/income', function (req, res) {
    let incomeData = req.body;
    Income.create(incomeData).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
})


// Get income by user_id.
app.get('/income/:user_id', function (req, res) {
    let data = {
        include: [User],
        where: { user_id: req.params.user_id }
    }
    Income.findAll(data).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.put('/income/:income_id', function (req, res) {
    let incomeId = req.params.income_id;
    Income.findByPk(incomeId).then((result) => {
        if (result) {
            Object.assign(result, req.body);
            result.save().then(() => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Income not found')
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
})

// Delete an income row
app.delete('/income/:income_id', function (req, res) {
    let incomeId = parseInt(req.params.income_id); // aware: params (you must to do, mandatory... not optional) Remember to ParseInt.
    Income.findByPk(incomeId).then((result) => { // find the income based on the incomeID
        if (result) {
            result.destroy().then(() => {
                res.status(200).send(result);
            }).catch((err) => {
                res.status(500).send(err);
            });
        } else {
            res.status(404).send('Expense not found.')
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
})

app.get('/budget', function (req, res) {
    let data = {
        include: [User, Category]
    }
    Budget.findAll(data).then((results) => {
        res.status(200).send(results);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

// Create server
app.listen(3000, function () {
    console.log('Server running on port 3000...');
});