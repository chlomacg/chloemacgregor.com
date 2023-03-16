#### Brevis: Tutorial
For this portion, we're going to rewrite some common programming patterns in Brevis, to get a feel for what the language is like. These will look very familiar to those who program in functional languages.

##### Hello World!
	print("Hello World!");
There's really only thing that can be taken away from this, and it's that Brevis has no concept of a main function, and just exectutes cde line by line, similar to most scripting languages.

##### For-loops
	let for_range = fn(low, high, f) {
		if low <= high {
			f(low);
			for_range(low + 1, high, f)
		}
	};
This snippet shows how one might define looping mechanisms within the Brevis language. By making functions first-class and tail-call optimized, nice things like this are available for free.

##### FizzBuzz
	let fizzbuzz = fn(n) {
		let ret = "";
		ret = ret ~ (if n % 3 == 0 { "Fizz" } else "");
		ret = ret ~ (if n % 5 == 0 { "Buzz" } else "");
		
		if ret == "" {
			itoa(n)
		} else {
			ret
		}
	};

	for_range(1, 100,
		fn(n) {
			print(fizzbuzz(n) ~ "\n");
		}
	);
Not much to comment here, readers of this page are probably sick of this problem already. We use the `for_range` function defined in the previous snippet, because why have WET code when you can just not?
