using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleEstoque.API.Migrations
{
    /// <inheritdoc />
    public partial class Pagamento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_FormasPagamento_FormaPagamentoId",
                table: "Pedidos");

            migrationBuilder.AlterColumn<int>(
                name: "FormaPagamentoId",
                table: "Pedidos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_FormasPagamento_FormaPagamentoId",
                table: "Pedidos",
                column: "FormaPagamentoId",
                principalTable: "FormasPagamento",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_FormasPagamento_FormaPagamentoId",
                table: "Pedidos");

            migrationBuilder.AlterColumn<int>(
                name: "FormaPagamentoId",
                table: "Pedidos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_FormasPagamento_FormaPagamentoId",
                table: "Pedidos",
                column: "FormaPagamentoId",
                principalTable: "FormasPagamento",
                principalColumn: "Id");
        }
    }
}
