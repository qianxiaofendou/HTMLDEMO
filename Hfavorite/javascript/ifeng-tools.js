!function(){
	 "undefined" == typeof ifeng && (ifeng = {}),
     ifeng.client = {},
     ifeng.client.system = {
		get: function() {
			var e = {},
			t = "",
			i = "Win",
			r = navigator.userAgent;
			if (t = navigator.platform, e.win = 0 === t.indexOf("Win"), e.mac = 0 === t.indexOf("Mac"), e.x11 = "X11" === t || 0 === t.indexOf("Linux"), e.win) {
				if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(r)) if ("NT" === RegExp.$1) switch (RegExp.$2) {
				case "5.0":
					i = "windows_2000";
					break;
				case "5.1":
					i = "windows_XP";
					break;
				case "6.0":
					i = "windows_Vista";
					break;
				case "6.1":
					i = "windows_7";
					break;
				case "6.2":
					i = "windows_8";
					break;
				default:
					i = "windows_NT"
				} else i = "9x" === RegExp.$1 ? "windows_ME": r.match(/(Windows Phone)\s+([\d.]+)/) ? "WP_" + r.match(/(Windows Phone)\s+([\d.]+)/)[2] : "Ph" === RegExp.$1 ? "WP": "windows_" + RegExp.$2;
				r.match(/(Android)\s+([\d.]+)/) && (i = "Android_" + r.match(/(Android)\s+([\d.]+)/)[2])
			} else e.mac ? i = r.match(/(iPad).*OS\s([\d_]+)/) || r.match(/(iPhone\sOS)\s([\d_]+)/) ? "iOS": "Mac": e.x11 ? i = r.match(/(Android)\s+([\d.]+)/) ? "Android_" + r.match(/(Android)\s+([\d.]+)/)[2] : "Linux": r.match(/Windows Phone/) ? i = "WP": r.match(/(iPad).*OS\s([\d_]+)/) || r.match(/(iPhone\sOS)\s([\d_]+)/) ? i = "iOS_" + (r.match(/(iPad).*OS\s([\d_]+)/) ? r.match(/(iPad).*OS\s([\d_]+)/)[2] : r.match(/(iPhone\sOS)\s([\d_]+)/)[2]) : r.match(/(Android)\s+([\d.]+)/) && (i = "Android_" + r.match(/(Android)\s+([\d.]+)/)[2]);
			return i
		}
	},
	ifeng.client.device = {
		get: function() {
			var _device = 'PC', ua = navigator.userAgent;

            var iPad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var iPhone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
            var Android = ua.match(/(Android)\s+([\d.]+)/);
            var WP = ua.match(/(Windows Phone)\s+([\d.]+)/);

            if (iPad) {
                _device = 'iPad';
            }

            if (iPhone) {
                _device = 'iPhone';
            }

            if (Android) {
                if (!ua.toLowerCase().match(/mobile/)) {
                    _device = 'Pad';
                } else if (ua.match(/chrome\/([\d.]+)/) && ua.toLowerCase().match(/mobile/)) {
                    _device = 'Phone';
                } else if (ua.toLowerCase().match(/firefox\/([\d.]+)/) && ua.toLowerCase().match(/mobile/)) {
                    _device = 'Phone';
                } else {
                    _device = 'Phone';
                }

            }

            if (WP) {
                _device = 'Phone';
            }

            return _device;
		}
	}
     
}();