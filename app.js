
function getDataPickerConfig(defaultDate = null) {
    return {
        enableTime: true,
        locale: "pt",
        altInput: true,
        altFormat: "H:i", // altFormat: "H:i - j \\de F, Y",
        minuteIncrement: 1,
        defaultDate: defaultDate,
        noCalendar: true
    };
}

function todayWithSpecificTime(hours = null) {
    const now = new Date();
    
    if (!hours) {
        return now;
    }

    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours);
}

/**
 * 
 * @param {Date} horarioChegada 
 * @param {Date} horarioAlmoco 
 * @param {Date} horarioFimAlmoco 
 * @param {Number} minsATrabalhar Padrao 8 horas
 */
function calcularHorarioDeSaida(horarioChegada, horarioAlmoco, horarioFimAlmoco, minsATrabalhar = 480) {
    const momentChegada = moment(horarioChegada);
    const momentAlmoco = moment(horarioAlmoco);
    const momentFimAlmoco = moment(horarioFimAlmoco);

    const tempoManha = momentAlmoco.diff(momentChegada);
    const durationTrabalho = moment.duration(minsATrabalhar, 'minutes');
    const msRestanteTrabalho = durationTrabalho.asMilliseconds() - tempoManha;

    const momentSaida = momentFimAlmoco.add(msRestanteTrabalho, 'milliseconds');

    const elemSaidaDOM = document.querySelector("#elem-horario-saida");
    elemSaidaDOM.innerText = momentSaida.format("LT");
}

function onValueUpdate(selectedDates, dateStr, instance) {
    calcularHorarioDeSaida(pickerChegada.selectedDates[0], pickerInicioAlmoco.selectedDates[0], pickerFimAlmoco.selectedDates[0]);
}

const pickerChegada = flatpickr("#input-horario-chegada", getDataPickerConfig(todayWithSpecificTime(8)));
const pickerInicioAlmoco = flatpickr("#input-horario-inicio-almoco", getDataPickerConfig(todayWithSpecificTime(12)));
const pickerFimAlmoco = flatpickr("#input-horario-fim-almoco", getDataPickerConfig(todayWithSpecificTime(13)));

// Config moment.js para portugues
moment.locale('pt-br');

pickerChegada.config.onChange.push(onValueUpdate)
pickerInicioAlmoco.config.onChange.push(onValueUpdate)
pickerFimAlmoco.config.onChange.push(onValueUpdate)

calcularHorarioDeSaida(pickerChegada.selectedDates[0], pickerInicioAlmoco.selectedDates[0], pickerFimAlmoco.selectedDates[0]);
