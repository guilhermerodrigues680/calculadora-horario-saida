
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

/**
 * Calcula a diferenca entre duas datas
 * @param {Date} date1 Data mais antiga
 * @param {Date} date2 Data mais recente
 */
function timeBetweenTwoDates(date1, date2) {
    if (!date1 || !date2) {
        throw new Error("Datas vazias")
    }

    return date2.getTime() - date1.getTime();
}

/**
 * Recebe millisegundo e retorna um 
 * @param {Number} sec_num
 */
function convertToObjHHMMSS(ms_num) {
    const sec_num = Math.round(ms_num / 1000);
    const hours   = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds = sec_num - (hours * 3600) - (minutes * 60);

    // if (hours   < 10) {hours   = "0"+hours;}
    // if (minutes < 10) {minutes = "0"+minutes;}
    // if (seconds < 10) {seconds = "0"+seconds;}

    //return hours+':'+minutes+':'+seconds;
    return {
        hours,
        minutes,
        seconds
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
    const tempoManha = timeBetweenTwoDates(horarioChegada, horarioAlmoco);
    //const tempoAlmoco = timeBetweenTwoDates(horarioAlmoco, horarioFimAlmoco);

    const tempoTotalTrabalho = minsATrabalhar * 60 * 1000;
    const horarioDeSaida = new Date(horarioFimAlmoco.getTime() + tempoTotalTrabalho - tempoManha);

    console.debug(horarioDeSaida);

    const elemSaidaDOM = document.querySelector("#elem-horario-saida");
    elemSaidaDOM.innerText = horarioDeSaida.toLocaleTimeString("pt-br");
}

function onValueUpdate(selectedDates, dateStr, instance) {
    calcularHorarioDeSaida(pickerChegada.selectedDates[0], pickerInicioAlmoco.selectedDates[0], pickerFimAlmoco.selectedDates[0]);
}

const pickerChegada = flatpickr("#input-horario-chegada", getDataPickerConfig(todayWithSpecificTime(8)));
const pickerInicioAlmoco = flatpickr("#input-horario-inicio-almoco", getDataPickerConfig(todayWithSpecificTime(12)));
const pickerFimAlmoco = flatpickr("#input-horario-fim-almoco", getDataPickerConfig(todayWithSpecificTime(13)));

pickerChegada.config.onValueUpdate.push(onValueUpdate)
pickerInicioAlmoco.config.onValueUpdate.push(onValueUpdate)
pickerFimAlmoco.config.onValueUpdate.push(onValueUpdate)

calcularHorarioDeSaida(pickerChegada.selectedDates[0], pickerInicioAlmoco.selectedDates[0], pickerFimAlmoco.selectedDates[0]);
