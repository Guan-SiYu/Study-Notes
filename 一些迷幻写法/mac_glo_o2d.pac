var domains = {
	"dfrzrujw.com" :1,
	"fhhnrerg.com" :1,
	"nurndtaa.com" :1,
	"ufxdzlrc.com" :1,
	"iieangyg.com" :1,
	"txsrnssy.com" :1,
	"kjogdjap.com" :1,
	"wzsawnao.com" :1,
	"dgapcapr.com" :1,
	"hgyqmlwo.com" :1,
	"hfilqocm.com" :1,
	"sboneynm.com" :1,
	"wscgbohc.com" :1,
	"nzzcjtke.com" :1,
	"wretpwmp.com" :1,
	"mdlefhnp.com" :1,
	"wpjxoula.com" :1,
	"pdhziitn.com" :1,
	"hovfawlg.com" :1,
	"fvrcscoe.com" :1,
	"fspengbo.com" :1,
	"llzggzjy.com" :1,
	"dispatch.comsunny.com": 1,
	"alipay.com": 1,
    "gateway.lltsl.com":1,
    "gaogor.com":1
};

var proxy = "PROXY 127.0.0.1:8118; DIRECT;";

var direct = 'DIRECT;';

function FindProxyForURL(url, host) {
    var lastPos;
    do {
        if (domains.hasOwnProperty(host)) {
            return direct;
        }
        lastPos = host.indexOf('.') + 1;
        host = host.slice(lastPos);
    } while (lastPos >= 1);
    return proxy;
}
