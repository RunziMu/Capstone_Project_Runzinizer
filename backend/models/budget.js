const Sequelize = require('sequelize');
const config = require('./../config');
const Budget = config.define('budget', {
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
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    budget_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    budget_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
}, { timestamps: false });

module.exports = Budget;