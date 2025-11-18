import express from 'express';
import cors from 'cors'; // Importa o módulo cors

const app = express();
const PORT = 3000;

// A lista de veterinários que seu app precisa
const vets = [
  {
    id: 1,
    nome: "Dra. Ana Silva",
    especialidade: "Clínica Geral",
    avatar: "https://i.pravatar.cc/150?img=1",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s5", name: "Exame de Sangue", price: "R$ 150,00" }],
    availableDays: [1, 2, 3, 4, 5], // Seg a Sex
    availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00"],
  },
  {
    id: 2,
    nome: "Dr. Carlos Souza",
    especialidade: "Cirurgia de Pequenos Animais",
    avatar: "https://i.pravatar.cc/150?img=2",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s6", name: "Cirurgia de Castração", price: "R$ 800,00" }, { id: "s7", name: "Remoção de Tumores", price: "R$ 2.500,00" }],
    availableDays: [1, 3, 5], // Seg, Qua, Sex
    availableTimes: ["08:00", "10:00", "12:00"],
  },
  {
    id: 3,
    nome: "Dra. Marina Oliveira",
    especialidade: "Dermatologia Veterinária",
    avatar: "https://i.pravatar.cc/150?img=3",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s8", name: "Tratamento de Alergias", price: "R$ 250,00" }, { id: "s9", name: "Biopsia de Pele", price: "R$ 400,00" }],
    availableDays: [2, 4], // Ter, Qui
    availableTimes: ["14:00", "15:30", "17:00"],
  },
  {
    id: 4,
    nome: "Dr. Bruno Lima",
    especialidade: "Cardiologia Veterinária",
    avatar: "https://i.pravatar.cc/150?img=4",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s10", name: "Ecocardiograma", price: "R$ 600,00" }],
    availableDays: [0, 6], // Dom, Sáb
    availableTimes: ["09:00", "10:30", "11:30"],
  },
  {
    id: 5,
    nome: "Dra. Letícia Santos",
    especialidade: "Oftalmologia Veterinária",
    avatar: "https://i.pravatar.cc/150?img=5",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s11", name: "Exame de Retina", price: "R$ 350,00" }],
    availableDays: [1, 2, 3, 4, 5],
    availableTimes: ["13:00", "14:00", "15:00", "16:00"],
  },
  {
    id: 6,
    nome: "Dr. Rafael Costa",
    especialidade: "Neurologia Veterinária",
    avatar: "https://i.pravatar.cc/150?img=6",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s12", name: "Ressonância Magnética", price: "R$ 1.500,00" }],
    availableDays: [1, 2, 3, 4, 5],
    availableTimes: ["11:00", "13:00", "15:00", "17:00"],
  },
  {
    id: 7,
    nome: "Dra. Juliana Pereira",
    especialidade: "Odontologia Veterinária",
    avatar: "https://i.pravatar.cc/150?img=7",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s13", name: "Limpeza de Tártaro", price: "R$ 450,00" }],
    availableDays: [1, 2, 3, 4, 5],
    availableTimes: ["09:30", "11:00", "14:30", "16:00"],
  },
  {
    id: 8,
    nome: "Dr. Gustavo Fernandes",
    especialidade: "Endocrinologia Veterinária",
    avatar: "https://i.pravatar.cc/150?img=8",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s14", name: "Controle Hormonal", price: "R$ 200,00" }],
    availableDays: [1, 2, 3, 4, 5],
    availableTimes: ["08:00", "09:00", "10:00", "11:00"],
  },
  {
    id: 9,
    nome: "Dra. Camila Rocha",
    especialidade: "Reprodução Animal",
    avatar: "https://i.pravatar.cc/150?img=9",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s15", name: "Inseminação Artificial", price: "R$ 700,00" }],
    availableDays: [1, 2, 3, 4, 5],
    availableTimes: ["14:00", "16:00", "18:00"],
  },
  {
    id: 10,
    nome: "Dr. Felipe Martins",
    especialidade: "Oncologia Veterinária",
    avatar: "https://i.pravatar.cc/150?img=10",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s16", name: "Quimioterapia", price: "R$ 900,00" }],
    availableDays: [1, 2, 3, 4, 5],
    availableTimes: ["10:00", "12:00", "14:00", "16:00"],
  },
  {
    id: 11,
    nome: "Dra. Patrícia Ramos",
    especialidade: "Radiologia Veterinária",
    avatar: "https://i.pravatar.cc/150?img=11",
    services: [{ id: "s1", name: "Consulta", price: "R$ 300,00" }, { id: "s17", name: "Raio-X", price: "R$ 180,00" }],
    availableDays: [1, 2, 3, 4, 5],
    availableTimes: ["08:30", "10:30", "13:30", "15:30"],
  },
]

// Adiciona o CORS para permitir conexões do app web
app.use(cors());

// A rota que o app vai chamar
app.get('/api/vets', (req, res) => {
  console.log("Servidor: Requisição recebida em /api/vets.");
  res.json(vets);
});

// Escuta na porta 3000 e em todas as interfaces de rede
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor SIMPLES rodando na porta ${PORT}.`);
  console.log(`   Acesse na sua rede: http://SEU_IP_LOCAL:${PORT}/api/vets`);
});