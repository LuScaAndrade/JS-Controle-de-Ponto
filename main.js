const btnCalcular = document.querySelector('.calcButton');
const iptChegada = document.querySelector('.answerInput1');
const iptInicio = document.querySelector('.answerInput2');
const iptFim = document.querySelector('.answerInput3');

function horasParaMinutos(horaStr) {
    const [horas, minutos] = horaStr.split(":").map(Number);
    return horas * 60 + minutos;
}

function converterHoraParaString(minutos) {
    const horas = Math.floor(minutos / 60);
    const min = minutos % 60
    return `${horas}:${min.toString().padStart(2, "0")}`;
}

const horasDiarias = 528; // minutos

btnCalcular.addEventListener('click', function () {
    const chegada = horasParaMinutos(iptChegada.value);
    const inicio = horasParaMinutos(iptInicio.value);
    const fim = horasParaMinutos(iptFim.value);

    const horaAteAlmoco = inicio - chegada;

    const tempoDeAlmoco = fim - inicio;

    const horasRestantes = horasDiarias - horaAteAlmoco;

    const horaSaida = chegada + horasDiarias + tempoDeAlmoco;

    window.alert(`Horário de Saída: ${converterHoraParaString(horaSaida)} 
Faltam: ${converterHoraParaString(horasRestantes)} 
Tempo de almoço: ${converterHoraParaString(tempoDeAlmoco)}`)
})

iptChegada.addEventListener('keypress', function (e) {
    if (e.KeyCode === 13) {
        console.log("Enter pressionado");
    }
})

// Função para formatar a entrada de hora (0800 → 08:00)
function aplicarMascaraHora(input) {
    input.addEventListener('input', function () {
        let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número
        if (valor.length >= 4) {
            valor = valor.slice(0, 4); // Garante que não passe de 4 dígitos
            input.value = valor.replace(/(\d{2})(\d{2})/, "$1:$2"); // Formata para HH:MM
        } else {
            input.value = valor; // Se for menor que 4 dígitos, apenas mantém os números
        }
    });
}

// Aplica a máscara nos campos
[iptChegada, iptInicio, iptFim].forEach(aplicarMascaraHora);