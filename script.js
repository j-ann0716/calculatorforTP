$(document).ready(function () {
    let expression = "";
    const display = $("#calc-display");
    const historyList = $("#history-rec");

    $(".num, .op, .negative").click(function () {
        const value = $(this).data("value");
        expression += value;
        display.val(expression);
    });

    $("#clear").click(function () {
        expression = "";
        display.val("");
    });

    $("#delete").click(function () {
        expression = expression.slice(0, -1);
        display.val(expression);
    });

    $("#equal").click(function () {
        if (expression) {
            let result = expression.replace(/÷/g, "/").replace(/×/g, "*");
            try {
                let evalResult = eval(result);
                let historyEntry = `${expression} = ${evalResult}`;
                expression = evalResult.toString();
                display.val(expression);

                // Add to history (max 5 items)
                let historyItems = historyList.children();
                if (historyItems.length >= 5) {
                    historyItems.first().remove();
                }
                historyList.append(`<div>${historyEntry}</div>`);
            } catch (error) {
                display.val("Error");
                expression = "";
            }
        }
    });
});
