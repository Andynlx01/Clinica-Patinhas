/**
 * Constantes e dados de referência
 * Facilita manutenção centralizada de listas
 */

export const SPECIALTIES = [
  { id: "general", label: "Clínica Geral" },
  { id: "dermatology", label: "Dermatologia" },
  { id: "surgery", label: "Cirurgia" },
  { id: "ophthalmology", label: "Oftalmologia" },
  { id: "orthopedics", label: "Ortopedia" },
  { id: "cardiology", label: "Cardiologia" },
]

export const SPECIES = [
  "Cão",
  "Gato",
  "Coelho",
  "Hamster",
  "Pássaro",
  "Tartaruga",
  "Peixe",
  "Porquinho da Índia",
  "Chinchila",
  "Ferret",
  "Cobra",
  "Camaleão",
  "Iguana",
]

export const BREED_BY_SPECIES: Record<string, string[]> = {
  Cão: [
    "Labrador",
    "Pastor Alemão",
    "Golden Retriever",
    "Bulldog",
    "Poodle",
    "Shih Tzu",
    "Dálmata",
    "Husky",
    "Beagle",
    "Pinscher",
    "Sem Raça Definida",
  ],
  Gato: [
    "Persa",
    "Siamês",
    "Maine Coon",
    "Ragdoll",
    "Bengal",
    "Abissínio",
    "Birmanês",
    "Cornish Rex",
    "Sphynx",
    "Sem Raça Definida",
  ],
  Coelho: ["Holandês", "Angorá", "Líop", "Califórnia", "Gigante Flamengo"],
  Hamster: ["Sírio", "Russo", "Chinês", "Roborovski"],
  Pássaro: ["Calopsita", "Papagaio", "Canário", "Periquito", "Tucano"],
  Tartaruga: ["Aquática", "Terrestre", "Grega"],
  Peixe: ["Betta", "Koi", "Guppy", "Acará", "Neon"],
  "Porquinho da Índia": ["Inglês", "Abissínio", "Coroado", "Texel"],
  Chinchila: ["Padrão", "Pele Negra"],
  Ferret: ["Doméstico"],
  Cobra: ["Jiboia", "Píton", "Cobras-de-Corno"],
  Camaleão: ["Pantera", "Véu", "Jacksons"],
  Iguana: ["Verde", "Rinoceronte"],
}

export const APPOINTMENT_STATUS = {
  scheduled: "Agendada",
  completed: "Realizada",
  cancelled: "Cancelada",
}
