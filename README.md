# React TypeScript Icon Component Idea

[**DEMO**](https://tomashubelbauer.github.io/react-icon-component-idea)

In this repository I prototype an idea I had after seeing the Ant `Icon` component, which looks like this:

```tsx
<Icon type="clock-circle" />
```

It makes sense that this component would be designed like this, but I thought of a hack which might be funny so I
decided to try and put it together.

At the core of the idea (like most of my ideas TBH) are TypeScript type unions. Uusually, these have a discriminator
field, e.g.: `{ type: 'unary'; operand: number; } | { type: 'binary'; leftOperand: number; rightOperand: number; }`.
This field is very useful, because then an instance of this type can be used with a `switch` statement as demonstrated
below, and in each `case` block, the instance is retyped to the concrete member type of the union with that
discriminator field value:

```typescript
switch (operator.type) {
  case 'unary': {
    // `operator` is `{ type: 'unary'; operand: number; }` in this block
    break;
  }
  case 'binary': {
    // `operator` is `{ type: 'binary'; leftOperand: number; rightOperand: number; }` in this block
    break;
  }
  case 'ternary': {
    // This branch gives an error because `ternary` is not in `'unary' | 'binary'`
    break;
  }
  default: {
    // `operator` is `never` here
  }
}

// `operator` is the union type here again
```

There is also another kind of type unions in TypeScript, ones that do not have the discriminator field, such as:

```typescript
type Plus = { positive: true; negative: false; }
type Minus = { positive: false; negative: true; }
type Sign = Plus | Minus;
```

To tell which member type of the union an instance of the union type is, we need to use the `instanceof` operator:

```typescript
if (sign instanceof Plus) {
  // `sign` is `Plus` here
}

// You get the idea
```

Note that the above example is actually broken, because `Plus` and `Minus` are just object literals, so they both have
type `object`. They would have to both be classes in order for `instanceof` to actually work, but for this example this
honestly doesn't matter, because:

There is a third way of telling what type something is, which is by implementing a function which returns a type
predicate. Type predicates look like this: `arg is Type`. If a function returns this, it needs to return a `boolean`
value and TypeScript will be able to tell that `arg` (which is any argument name from the function's argument list)
is of the type given by the type predicate.

```typescript
function isPlus(sign: Sign): sign is Plus {
  return (sign as Plus).positive === true && (sign as Plus).negative === false;
}
```

The scope where TypeScript can utilize this knowledge is given by the enclosing block which proces the type, so that
will be a simple if most of the time:

```typescript
if (isPlus(sign)) {
  // `sign` is `Plus` here
} else {
  // `sign` is `Minus` here because that is the only other type in the `Sign` type union after removing `Plus`
  // If `Sign` had three meber types instead of two, `sign` would be the union of the remaining type here
}

// `sign` is `Sign` here
```

Putting all this together, we could have a React component whose props are a type union of distinct types, all of them
having a single field on it with the type of `true`, so a `boolean` literal which can only ever have the value of `true`
and then use these type predicate functions to tell which props we are dealing with in `render` and render the
respective icon based on that.

Why force the field type to be `true`? Because then you can use a TSX shorthand for boolean props, which looks like
this:

```tsx
<Icon name />
// The above is the same as the below but nice
<Icon name={true} />
// Additionally this will produce an error:
<Icon name={false} />
```

With the type union `props` we are not at risk of receiving multiple icon names in props, TypeScript coerces the props
to always be one of the finite number of possible props objects. With the `true` type of the single field we also ensure
that no one is cheeky and attempts to pass in a `false` for the icon name, which would be meaningless. And to prove that
this idea just keeps on giving, we could add any additional fields aside from the name so that the icon can have its
own props and we enforce they are only available for that icon.

A full example demonstrating this technique can be found in [`src/Icon.tsx`](src/Icon.tsx).

Notice in the example above that the individual member types can also individually extend other types for common props
across multiple icons.

One drawback of this approach is dealing with default prop values. I am not sure how to solve this, nor have I tried.
I do not use default props at all usually, so this has not been a problem for me.

Another point to be made is that one could of course just as well explore this single `Icon` component to an individual
component for each icon with its specific props etc. I usually do this, I do not use this hack in production myself, but
I like the idea.

## To-Do

### Turn this into a library for FatCow icons

### Use `switch (true)` if possible to avoid the array of `if`s

This `switch` may well be slower, but it will be much neater and the speed does
not really matter for such a small library.

```javascript
switch (true) {
  case this.isX(this.props) {
    return <X />;
  }
  case this.isY(this.props) {
    return <Y />;
  }
  case this.isZ(this.props) {
    return <Z />;
  }
}

throw new Error(`Invalid props!`);
```
