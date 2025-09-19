export declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	/**
	* @param {string} s
	* @param {string} core_fns
	* @returns {string}
	*/
	export function compile_js(s: string, core_fns: string): string;
	/**
	* @param {string} s
	* @returns {string}
	*/
	export function compile_py(s: string): string;
	/**
	* @param {string} s
	* @param {string} core_fns
	* @returns {string}
	*/
	export function compile_c(s: string, core_fns: string): string;
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly compile_js: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly compile_py: (a: number, b: number, c: number) => void;
  readonly compile_c: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export declare function wasm_bindgen (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
