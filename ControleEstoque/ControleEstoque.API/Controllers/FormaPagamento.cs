using ControleEstoque.API.DTOs;
using ControleEstoque.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ControleEstoque.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormaPagamentoController : ControllerBase
    {
        private readonly IFormaPagamentoService _formaPagamentoService;

        public FormaPagamentoController(IFormaPagamentoService formaPagamentoService)
        {
            _formaPagamentoService = formaPagamentoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var formasPagamento = await _formaPagamentoService.ObterTodosAsync();
            return Ok(formasPagamento);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var formaPagamento = await _formaPagamentoService.ObterPorIdAsync(id);

            if (formaPagamento == null)
                return NotFound();

            return Ok(formaPagamento);
        }

        [HttpPost]
        [Authorize(Roles = "Gerente")]
        public async Task<IActionResult> Create([FromBody] CriarFormaPagamentoDto dto)
        {
            var novaFormaPagamento = await _formaPagamentoService.CriarAsync(dto);

            return CreatedAtAction(nameof(GetById),
                new { id = novaFormaPagamento.Id },
                novaFormaPagamento);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Gerente")]
        public async Task<IActionResult> Update(int id, [FromBody] AtualizarFormaPagamentoDto dto)
        {
            if (id != dto.Id)
                return BadRequest("O ID da rota difere do ID da forma de pagamento.");

            await _formaPagamentoService.AtualizarAsync(dto);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Gerente")]
        public async Task<IActionResult> Delete(int id)
        {
            await _formaPagamentoService.RemoverAsync(id);

            return NoContent();
        }
    }
}
