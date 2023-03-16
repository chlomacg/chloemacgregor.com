### Brevis: Specifications

#### 1.0: The structure of a Brevis program

Brevis programs are made of three things: bindings, expressions, and types. Bindings state a fact that modifies the namespace of the program within a given scope, while expressions do not, and evaluate to a value. Expressions with side-effects can be written, as Brevis is an impure functional language, but they always contain a value, even if that value is of the `void` type.

##### 1.1: Bindings

Currently, the only binding implemented in the Brevis compiler is the `let` binding. Let bindings take the form of `let var: type`, or `let var: type = val`, for assignment at declaration.

<small>Note: types for bound names can be written out, but in nearly every case, the type of a variable can be inferred.</small>

##### 1.2: Expressions

Expressions look mostly like what you would expect. As of current, the expressions supported by the compiler are literals, identifiers, blocks, lambdas, if-expressions, unary expressions, binary expressions, and function calls.

 * Literals represent pieces of data known at compile time. Currently supported are string literals, integer literals, and floating-point literals, represented as `"string"`, `42`, and `3.14`, respectively.
 * Identifiers are just variables, and are written how one might expect. `x` for a variable named x, etc.
 * Blocks represent the sequencing of operations and data. Blocks are written as lines within curly braces, separated with semicolons, and contain the value of their last line. Because the "lines" in blocks can contain either bindings or expressions, the value of a block may, or may not, be void. As an example, the expression `{ f(); g(); 5 }` has the type `int`, and a value of 5, but f and g are still run before returning the value, because Brevis is an eagerly-evaluated language.<br><br><small>Note: the last semicolon in a block is optional, but, stylistically, if the last line has a void value, include the semicolon as a visual marker.</small>
 * Lambdas represent anonymous functions, are first-class expressions, and are written in the form `fn(arg1, arg2, arg3) expr`, where expr is the return value of the function. The return type is usually inferred, but it can be explicitly stated with the syntax <code>fn(arg1, arg2, arg3)(t<sub>return</sub>) expr</code>. As a more clear example, a function that returns the value passed to it would be written as `fn(x) x`, or, as is stylistically preferred, `fn(x){ x }`. Note that there is no separate syntax for declaring named functions; if a named function is wanted, a let binding can be used to bind the function to a name like any other value might be.
 * If-expressions take the form `if condition { then_expr } else { else_expr }`, where the the value of the whole expression is either then-expr, or else-expr, depending on the condition. If the value of the then-expr is void, or unused, no else-expression is needed, but otherwise, the types of the branches *must* agree.
 * Unary expressions represent the application of a unary operator on an expression. There are only two unary operators: the boolean not operator, `!`, and the numerical negation operator, `-`. Unary operators are written in prefix notation, like in most languages, i.e. `!condition` and `-x`.
 * Binary expressions represent the application of a binary operator on an expression, and are written in traditional infix notation. Below is a table of the currently available operators, the types they apply to, and their behavior. Custom binary operators are not implemented, but are being considered, despite my better judgement.

| Operator  | Description              | Precedence | Types                              |
|-----------|--------------------------|------------|------------------------------------|
| `=`       | Assignment               | 0          | `'a, 'a -> void`                   |
| `or`      | Logical Or               | 1          | `bool, bool -> bool`               |
| `xor`     | Logical Xor              | 2          | `bool, bool -> bool`               |
| `and`     | Logical And              | 3          | `bool, bool -> bool`               |
| `>`       | Greater Than             | 7          | `Num 'a, Num 'a -> bool`           |
| `>=`      | Greater Than or Equal To | 7          | `Num 'a, Num 'a -> bool`           |
| `<`       | Less Than                | 7          | `Num 'a, Num 'a -> bool`           |
| `<=`      | Less Than or Equal To    | 7          | `Num 'a, Num 'a -> bool`           |
| `==`      | Equal To                 | 7          | `'a, 'a -> bool`                   |
| `!=`      | Not Equal To             | 7          | `'a, 'a -> bool`                   |
| `~`       | String Concatenation     | 10         | `string, string -> string`         |
| `+`       | Addition                 | 10         | `Num 'a, Num 'a -> Num 'a`         |
| `-`       | Subtraction              | 10         | `Num 'a, Num 'a -> Num 'a`         |
| `*`       | Multiplication           | 20         | `Num 'a, Num 'a -> Num 'a`         |
| `/`       | Division                 | 20         | `Num 'a, Num 'a -> Num 'a`         |
| `%`       | Remainder                | 20         | `Num 'a, int -> Num 'a`            |
| `f(x)`    | Function call            | max        | `'a, f('a)('b) -> 'b`              |

 * Calls are written as in the C family of languages, i.e. `f(x)` or `g(4, 5)`, where the value of the expression is the value computed in the callee function. Variadic functions are not supported.

##### 1.3: Types
The primitive types in Brevis are `bool`, `int`, `float`, `string`, and `void`, which represent booleans, integers, floating-point numbers, strings, and the abscence of a value, respectively. Functions have types dependent on the types of their arguments, and their return type, and are written in the following style: <code>fn(t<sub>1</sub>, t<sub>2</sub>)(t<sub>return</sub>)</code>. For a function, say, `fn(x, y) { x + y + 1 }`, the type of the function is `fn(int, int)(int)`. Structures, unions, tuples, and generic types are not yet implemented, making functions the only type constructors in Brevis at the moment.

#### 2.0: Recursion
Brevis has a few guaranteed optimizations to make the language more usable, one of which is tail-call optimization, or TCO. TCO makes tail-recursive calls - calls at the end of a function - equivalent to a `goto`, meaning that no frames need to be pushed onto the stack during recursion, resulting in no stackoverflows from recursion depth. As for recursive non-tail-calls, those are not optimized, and a warning is issued for them.
