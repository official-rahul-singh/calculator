document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelector("#initial_amount"),
        t = (document.querySelector("#contribution_amount"), document.querySelector("#investment_timespan")),
        a = document.querySelector("#investment_timespan_text"),
        l = document.querySelector("#estimated_return"),
        r = document.querySelector(".middle-box span"),
        n = document.querySelector(".top-box span"),
        o = document.querySelector(".bottom-box span"),
        i = document.getElementById("pie");
    for (let u of document.querySelectorAll('input[type="range"].slider-progress'))
        u.style.setProperty("--value", u.value), u.style.setProperty("--min", "" == u.min ? "0" : u.min), u.style.setProperty("--max", "" == u.max ? "100" : u.max), u.addEventListener("input", () => u.style.setProperty("--value", u.value));
    let $ = (e, t, a) =>
            "" === e.value || parseFloat(e.value) < t
                ? ((e.style.webkitTextFillColor = a), (e.style.caretColor = a), (e.style.backgroundColor = "#eb474736"), !1)
                : ((e.style.webkitTextFillColor = "#000"), (e.style.caretColor = "#000"), (e.style.backgroundColor = "#fff"), !0),
        s = () => {
            var t = parseFloat(e.value),
                a = parseFloat(estimated_return.value / 100),
                l = parseFloat(contribution_amount.value.length > 0 ? contribution_amount.value : 0),
                i = parseInt(document.querySelector('[name="compound_period"]').value),
                u = parseInt(document.querySelector('[name="contribution_period"]').value),
                $ = parseInt(investment_timespan.value);
            new Date().getFullYear();
            var s = t + l * u * $;
            if (((interest = 0), (balance = s), a)) {
                var d = Math.pow(1 + a / i, i * $),
                    v = t * d,
                    p = (l * (d - 1)) / (a / u);
                (interest = (v + p - s).toFixed(0)), (balance = (v + p).toFixed(0));
            }
            return (
                (n.textContent = "$" + Intl.NumberFormat("en-IN").format(interest)),
                (r.textContent = "$" + Intl.NumberFormat("en-IN").format(l * $ * u)),
                (o.textContent = "$" + Intl.NumberFormat("en-IN").format(balance)),
                { labels: ["Starting Amount", "Total Interest"], datasets: [{ data: [t, interest], backgroundColor: ["#fc0200", "#424AB3"], hoverBackgroundColor: ["#fca0a0", "#646BC5"] }] }
            );
        },
        d = () => {
            var e = s();
            (m.data.labels = e.labels), (m.data.datasets[0].data = e.datasets[0].data), m.update();
        },
        v = document.querySelectorAll("input, select");
    v.forEach((r) => {
        r.addEventListener("copy", (e) => {
            e.preventDefault();
        }),
            r.addEventListener("paste", (e) => {
                e.preventDefault();
            }),
            r.addEventListener("keydown", (e) => {
                let t = e.which;
                (109 === t || 189 === t || 107 === t || 187 === t || 69 === t || 38 === t || 40 === t) && e.preventDefault(), ("initial_amount" === r.id || "investment_timespan" === r.id) && (110 === t || 190 === t) && e.preventDefault();
            }),
            r.addEventListener("input", (n) => {
                if ("estimated_return" === r.id || "investment_timespan" === r.id) var o = $(r, 1, "#eb4739ab");
                else if ("initial_amount" === r.id) var o = $(r, 5e3, "#eb4739ab");
                else var o = !0;
                contribution_amount.value >= 1e5 && (contribution_amount.value = 1e5),
                    e.value >= 1e7 && (e.value = 1e7),
                    l.value >= 30 && (l.value = 30),
                    t.value >= 30 && (t.value = 30),
                    "range" === r.type && (a.textContent = r.value + " Years"),
                    !(e.value < 5e3) && 0 !== e.value.length && !(l.value < 1) && 0 !== l.value.length && o && d();
            });
    });
    let p = i.getContext("2d"),
        m = new Chart(p, { type: "pie", data: s(), options: { responsive: !0, maintainAspectRatio: !1, title: { display: !1 }, legend: { display: !1 } } });
});
