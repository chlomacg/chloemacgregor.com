const mandelbrot = `let Bailout = 16.0;
let Maxiter = 1000;

let for_range = fn(low, high, f) {
	if low <= high {
		f(low);
		for_range(low + 1.0, high, f);
	}
};

let mandelbrot = fn(x, y) {
	let cr = y - 0.5;
	let ci = x;

	let aux = fn(i, zr, zi) {
		i = i + 1;
		let tmp = zr * zi;
		let zr2 = zr * zr;
		let zi2 = zi * zi;
		zr = zr2 - zi2 + cr;
		zi = tmp + tmp + ci;

		if zi2 + zr2 > Bailout {
			i
		} else if i > Maxiter {
			0
		} else {
			aux(i, zr, zi)
		}
	};

	aux(0, 0.0, 0.0)
};

let draw_mandelbrot = fn(size) {
	for_range(-size, size,
		fn(y) {
			for_range(-size, size,
				fn(x) {
					let i = mandelbrot(x/(size + 1.0), y/(size + 1.0));
					if i == 0 {
						print("*");
					} else {
						print(" ");
					}
				}
			);
			print("\\n");
		}
	)
};

draw_mandelbrot(40.0);`;

const fizzbuzz = `let fizzbuzz = fn(from, to) {
	let aux = fn(n, accumulator) {
		if (n % 3) == 0 {
			accumulator = accumulator ~ "Fizz";
		};
		if (n % 5) == 0 {
			accumulator = accumulator ~ "Buzz";
		};
		if (n % 3) != 0 and (n % 5) != 0 {
			accumulator = accumulator ~ itoa(n);
		};
		accumulator = accumulator ~ "\\n";

		if n == to {
			accumulator
		} else {
			n =
				if n < to {
					n + 1
				} else {
					n - 1
				};
			aux(n, accumulator)
		}
	};

	aux(from, "")
};

print(fizzbuzz(1, 100));`;

const factors = `let for_range = fn(low, high, f) {
	if low <= high {
		f(low);
		for_range(low + 1, high, f);
	}
};

let print_factors = fn(n) {
	let factors_str = fn(sub_n, factor) {
		if (sub_n % factor) == 0 {
			itoa(factor)
		} else {
			""
		}
	};

	for_range(0, n,
		fn(sub_n) {
			let factors = factors_str(n, sub_n);
			factors = factors ~
					if sub_n != n and factors != "" { ", " } else "";
			print(factors);
		}
	);
};

print_factors(5120);
`;

export function getExample(exampleName: string): string {
	switch(exampleName) {
		case "mandelbrot":
			return mandelbrot;
		case "fizzbuzz":
			return fizzbuzz;
		case "find factors":
			return factors;
		default:
			console.log("Error: received " + exampleName + " instead of valid example name");
			return "error";
	}
}