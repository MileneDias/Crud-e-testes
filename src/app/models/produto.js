import Sequelize, { Model } from 'sequelize';

class Produto extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            preco: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false
            },
            disponivel: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
        }, {
            sequelize
        });

        return this;
    }
}

export default Produto;