"use strict";
const Books = (sequelize, DataTypes) =>
    sequelize.define("books", {
        titleOFBook: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

module.exports = Books;