using ControleEstoque.API.Data;
using ControleEstoque.API.Models;
using Microsoft.EntityFrameworkCore;


namespace ControleEstoque.API.Services
{
    public class PedidoService : IPedidoService
    {
        private readonly AppDbContext _context;

        public PedidoService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Pedido> CriarPedidoAsync(int clienteId, int formaPagamentoId, List<ItemPedido> itens)
        {
            foreach (var item in itens)
            {
                var produto = await _context.Produtos.FindAsync(item.ProdutoId);

                if (produto == null)
                    throw new Exception($"Produto {item.ProdutoId} não encontrado no estoque.");

                item.PrecoUnitario = produto.Preco;
                produto.QuantidadeEstoque -= item.Quantidade;
            }

            var formaPagamento = await _context.FormasPagamento.FindAsync(formaPagamentoId);

            if (formaPagamento == null)
                throw new Exception("Forma de pagamento não encontrada.");

            var pedido = new Pedido
            {
                ClienteId = clienteId,
                FormaPagamentoId = formaPagamentoId,
                DataPedido = DateTime.Now,
                Status = "Aberto",
                Itens = itens
            };

            _context.Pedidos.Add(pedido);

            await _context.SaveChangesAsync();

            return pedido;
        }

        public async Task<IEnumerable<Pedido>> ListarPedidosDoClienteAsync(int clienteId)
        {
            return await _context.Pedidos
                .Include(p => p.Itens)
                    .ThenInclude(i => i.Produto)
                .Include(p => p.FormaPagamento)
                .Where(p => p.ClienteId == clienteId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Pedido?> ObterPedidoComDetalhesAsync(int pedidoId)
        {
            return await _context.Pedidos
                .Include(p => p.Itens)
                    .ThenInclude(i => i.Produto)
                .Include(p => p.FormaPagamento)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == pedidoId);
        }
    }
}