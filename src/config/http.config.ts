type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends RequestInit {
	params?: Record<string, string | number>;
}

class HttpClient {
	private baseURL: string;
	private defaultHeaders: HeadersInit;

	constructor(baseURL?: string, defaultHeaders: HeadersInit = {}) {
		this.baseURL = baseURL || process.env.NEXT_PUBLIC_BASE_URL || "";
		this.defaultHeaders = {
			"Content-Type": "application/json",
			...defaultHeaders,
		};
	}

	private buildUrl(url: string, params?: Record<string, string | number>) {
		// In browser: use window.location.origin so it works on any domain (dev + prod)
		// On server without env: fall back to localhost for dev
		const base =
			this.baseURL ||
			(typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

		const fullUrl = new URL(url, base);
		if (params) {
			Object.keys(params).forEach((key) => fullUrl.searchParams.append(key, String(params[key])));
		}
		return fullUrl.toString();
	}

	private async request<T>(method: HttpMethod, url: string, options: RequestOptions = {}): Promise<T> {
		const { params, ...rest } = options;
		const response = await fetch(this.buildUrl(url, params), {
			method,
			headers: this.defaultHeaders,
			...rest,
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`HTTP ${response.status}: ${errorText}`);
		}

		return response.json() as Promise<T>;
	}

	get<T>(url: string, options?: RequestOptions) {
		return this.request<T>("GET", url, options);
	}

	post<T>(url: string, body?: unknown, options?: RequestOptions) {
		return this.request<T>("POST", url, { body: JSON.stringify(body), ...options });
	}

	put<T>(url: string, body?: unknown, options?: RequestOptions) {
		return this.request<T>("PUT", url, { body: JSON.stringify(body), ...options });
	}

	patch<T>(url: string, body?: unknown, options?: RequestOptions) {
		return this.request<T>("PATCH", url, { body: JSON.stringify(body), ...options });
	}

	delete<T>(url: string, options?: RequestOptions) {
		return this.request<T>("DELETE", url, options);
	}
}

export const http = new HttpClient();
