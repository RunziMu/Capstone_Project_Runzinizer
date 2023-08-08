const Sequelize = require('sequelize');
const config = require('./../config');
const Income = config.define('income', {
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
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    }, 
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    income_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
}, { timestamps: false });

module.exports = Income;