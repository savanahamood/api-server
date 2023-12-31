"use strict";
const Clothes = (sequelize, DataTypes) =>
    sequelize.define("clothes", {
        clothesType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clothesSize: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

module.exports = Clothes;
