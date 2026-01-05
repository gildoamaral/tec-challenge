/**
 * @openapi
 * /orders:
 *   post:
 *     tags:
 *       - Pedidos
 *     summary: Criar novo pedido
 *     description: Cria um novo pedido com estado CREATED
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lab
 *               - patient
 *               - customer
 *               - services
 *             properties:
 *               lab:
 *                 type: string
 *                 example: Lab Central
 *               patient:
 *                 type: string
 *                 example: João Silva
 *               customer:
 *                 type: string
 *                 example: Hospital XYZ
 *               services:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - value
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Hemograma completo
 *                     value:
 *                       type: number
 *                       minimum: 0
 *                       example: 50.00
 *                     status:
 *                       type: string
 *                       enum: [PENDING, COMPLETED]
 *                       default: PENDING
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos ou valor total zerado
 *       401:
 *         description: Não autenticado
 *   get:
 *     tags:
 *       - Pedidos
 *     summary: Listar pedidos
 *     description: Lista pedidos ativos com paginação e filtro opcional por estado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *           enum: [CREATED, ANALYSIS, COMPLETED]
 *         description: Filtrar por estado do pedido
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *       401:
 *         description: Não autenticado
 */

/**
 * @openapi
 * /orders/{id}/advance:
 *   patch:
 *     tags:
 *       - Pedidos
 *     summary: Avançar estado do pedido
 *     description: Avança o estado do pedido seguindo a ordem CREATED -> ANALYSIS -> COMPLETED
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Estado do pedido avançado com sucesso
 *       400:
 *         description: Pedido já está no estado final ou foi deletado
 *       404:
 *         description: Pedido não encontrado
 *       401:
 *         description: Não autenticado
 */
