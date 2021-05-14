import Produto from '../models/Produto';
import { Op } from 'sequelize';

class ProdutoController {
    async store(req, res) {
        const { nome, preco, disponivel } = req.body;

        if(!nome){
            return res.status(400).json({
                data:{
                    msg: 'Nome do produto Obrigatório'
                }
            });
        }

        if(!preco){
            return res.status(400).json({
                data:{
                    msg: 'Preço do produto Obrigatório'
                }
            });
        }

        const produto = await Produto.create({
            nome,
            preco,
            disponivel
        });

        return res.status(200).json({
            data: produto
        });
    }

    async index(req, res) {
        const { disponivel, nome } = req.query;

        let condicaoWhere = {};
        if (nome) {
            condicaoWhere.nome = { [Op.like]: `%${nome}%` };
        }

        if (disponivel) {
            condicaoWhere.disponivel = disponivel === 'true';
        }

        try {
            const produtos = await Produto.findAll({
                attributes: ['id', 'nome', 'preco', 'disponivel'],
                where: condicaoWhere,
            });

            return res.status(200).json({
                data: produtos,
                cache: false,
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message ?? error });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { nome, preco, disponivel } = req.body;

        const produtos = await Produto.findOne({
            where: {id}
        });

        if(!produtos){
            return res.status(404).json({
                data:{
                    msg: 'Produto não encontrado'
                }
            });
        }

        const produto = await Produto.findOne({
            attributes: ['id'],
            where: { id },
        });

        const [linha, objeto] = await Produto.update({
            nome,
            preco,
            disponivel
        }, {
            where: {
                id
            },
            returning: true,
        });

        return res.status(200).json({
            data: objeto,
        });
    }

    async delete(req, res) {
        const { id } = req.params;

        const response = await Produto.destroy({
            where: {
                id
            }
        });

        return res.status(200).json({
            data: {
                msg: "OK"
            }
        });
    }
}

export default new ProdutoController();