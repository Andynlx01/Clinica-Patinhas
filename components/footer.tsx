export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo e Descrição */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Clinica Patinhas</h3>
            <p className="text-primary-foreground/80">
              Cuidado profissional, acolhimento genuíno. Aqui seu pet é nossa prioridade.
            </p>
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Siga-nos no Patagram</p>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors underline">
                Patagram - Rede Social de Pets
              </a>
            </div>
          </div>

          {/* Horário */}
          <div>
            <h4 className="text-lg font-bold mb-4">Horário de Funcionamento</h4>
            <p className="text-primary-foreground/80 mb-2">Segunda a Sexta: 8h - 19h</p>
            <p className="text-primary-foreground/80 mb-2">Sábado: 9h - 14h</p>
            <p className="text-primary-foreground/80">Domingo: Fechado</p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-bold mb-4">Entre em Contato</h4>
            <p className="text-primary-foreground/80 mb-2">Telefone: (83) 3456-7890</p>
            <p className="text-primary-foreground/80 mb-2">WhatsApp: (83) 98765-4321</p>
            <p className="text-primary-foreground/80">Email: contato@patinhas.com.br</p>
          </div>
        </div>

        {/* Endereço e Divisor */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <p className="text-center text-primary-foreground/80 mb-4">
            Rua das Patinhas, 123 - Bairro Alto do Mateus - João Pessoa, PB
          </p>
          <p className="text-center text-primary-foreground/70">© 2025 Clinica Patinhas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
