namespace ControleEstoque.API.Models
{
    public class FormaPagamento
    {
        public int Id { get; set; }
        // Ex;: Cartão de Crédito, Dinheiro, Pix, etc.
        public string Nome { get; set; } = string.Empty;
        public bool Ativo { get; set; } = true;
       
        // Relacionamento com varios Pedidos
        public ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
}
