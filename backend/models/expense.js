const Sequelize = require('sequelize');
const config = require('./../config');
const Expense = config.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cate_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    // expense_cate_name: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }, 
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    expense_date: {
        type: Sequelize.DATE,
        allowNull: false,
    }

}, { timestamps: false });

module.exports = Expense;