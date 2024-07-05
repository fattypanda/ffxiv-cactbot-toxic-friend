import { serve } from "https://deno.land/std@0.153.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.153.0/http/file_server.ts";

serve((req) => {
	const url = new URL(req.url);
	
	// Redirect root to /index.html
	if (url.pathname === "/") {
		url.pathname = "/index.html";
	}
	
	return serveDir(req, { fsRoot: "public", url: url.toString() });
});
