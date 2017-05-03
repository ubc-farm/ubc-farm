# money
Code to work with money. Money values should be stored as an integer representing
cents, and some functions for helping with that are provided here.

## Classes

<dl>
<dt><a href="#Money">Money</a></dt>
<dd><p>A class used to represent money. Internally the money value is stored
as cents, so most of the time it will be an integer which can be used
for math without floating point troubles.
It can also be formatted with the toString() function, utilizing
Number.toLocaleString().</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#centsToString">centsToString(cents, [locale], [options])</a></dt>
<dd><p>Returns a formatted currency string.
If value is NaN, an empty string is returned.</p>
</dd>
<dt><a href="#stringToCents">stringToCents(str)</a> ⇒ <code>number</code></dt>
<dd><p>Converts a string representing money to a number representing cents</p>
</dd>
<dt><a href="#floatToCents">floatToCents(float)</a></dt>
<dd><p>Converts a float representing dollars to a number representing cents</p>
</dd>
</dl>

<a name="Money"></a>

## Money
A class used to represent money. Internally the money value is stored
as cents, so most of the time it will be an integer which can be used
for math without floating point troubles.
It can also be formatted with the toString() function, utilizing
Number.toLocaleString().

**Kind**: global class

* [Money](#Money)
    * [new Money(thing)](#new_Money_new)
    * _instance_
        * [.dollars](#Money+dollars)
        * [.cents](#Money+cents)
        * [.getDollars()](#Money+getDollars) ⇒ <code>number</code>
        * [.getCents(digits)](#Money+getCents) ⇒ <code>number</code>
        * [.toInteger()](#Money+toInteger) ⇒ <code>number</code>
        * [.valueOf()](#Money+valueOf) ⇒ <code>number</code>
        * [.toString([locale], [options])](#Money+toString)
        * [.toJSON()](#Money+toJSON) ⇒ <code>string</code>
    * _static_
        * [.fromInteger(cents)](#Money.fromInteger) ⇒ <code>[Money](#Money)</code>

<a name="new_Money_new"></a>

### new Money(thing)

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>any</code> | value converted into the Money value. If a Money instead, returns a new Money with the same value. If a number, assumes that the number is a decimal representing dollars and cents and converts it to a string. If a string, any non-digit values, except for the first . character, are stripped and the result is stored. |

<a name="Money+dollars"></a>

### money.dollars
Same as getDollars()

**Kind**: instance property of <code>[Money](#Money)</code>
<a name="Money+cents"></a>

### money.cents
Same as getCents(0)

**Kind**: instance property of <code>[Money](#Money)</code>
<a name="Money+getDollars"></a>

### money.getDollars() ⇒ <code>number</code>
**Kind**: instance method of <code>[Money](#Money)</code>
**Returns**: <code>number</code> - the dollar value of this money
<a name="Money+getCents"></a>

### money.getCents(digits) ⇒ <code>number</code>
Returns the cents of this money.

**Kind**: instance method of <code>[Money](#Money)</code>
**Returns**: <code>number</code> - will always be between -100 and 100

| Param | Type | Description |
| --- | --- | --- |
| digits | <code>number</code> | if specified, toFixed will be called on the value before determining the cents value. |

<a name="Money+toInteger"></a>

### money.toInteger() ⇒ <code>number</code>
**Kind**: instance method of <code>[Money](#Money)</code>
**Returns**: <code>number</code> - the integer value of this money, stripping
any fractional cents. Useful for doing money related math,
as integers won't suffer from floating point problems.
**Example**
```js
new Money('$10.99').toInteger() === 1099
```
<a name="Money+valueOf"></a>

### money.valueOf() ⇒ <code>number</code>
**Kind**: instance method of <code>[Money](#Money)</code>
**Returns**: <code>number</code> - float representation of the money
Will be NaN if the internal value is null.
<a name="Money+toString"></a>

### money.toString([locale], [options])
Returns a formatted currency string.
If value is NaN, an empty string is returned.

**Kind**: instance method of <code>[Money](#Money)</code>
**See**: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [locale] | <code>string</code> |  |  |
| [options] | <code>Object</code> |  |  |
| [options.parentheses] | <code>boolean</code> |  | wrap negative numbers in parentheses |
| [options.currency] | <code>string</code> | <code>&quot;USD&quot;</code> | currency locale to return |

<a name="Money+toJSON"></a>

### money.toJSON() ⇒ <code>string</code>
**Kind**: instance method of <code>[Money](#Money)</code>
**Returns**: <code>string</code> - The money as a simple string
<a name="Money.fromInteger"></a>

### Money.fromInteger(cents) ⇒ <code>[Money](#Money)</code>
**Kind**: static method of <code>[Money](#Money)</code>
**Returns**: <code>[Money](#Money)</code> - with a value based off the provided cent amount

| Param | Type | Description |
| --- | --- | --- |
| cents | <code>number</code> | an integer like that returned by Money#toInteger |

**Example**
```js
Money.fromInteger(1099) == new Money('$10.99')
```
<a name="centsToString"></a>

## centsToString(cents, [locale], [options])
Returns a formatted currency string.
If value is NaN, an empty string is returned.

**Kind**: global function
**See**: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cents | <code>number</code> |  |  |
| [locale] | <code>string</code> |  |  |
| [options] | <code>Object</code> |  |  |
| [options.parentheses] | <code>boolean</code> |  | wrap negative numbers in parentheses |
| [options.currency] | <code>string</code> | <code>&quot;CAD&quot;</code> | currency locale to return |

<a name="stringToCents"></a>

## stringToCents(str) ⇒ <code>number</code>
Converts a string representing money to a number representing cents

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | value converted into the Money value. Any non-digit values, except for the first . character, are stripped and the result is stored. |
| [options.trunc] | <code>boolean</code> | truncate fractional cents. If true, an integer will be returned. |

<a name="floatToCents"></a>

## floatToCents(float)
Converts a float representing dollars to a number representing cents

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| float | <code>number</code> | to convert into cents. |
| [options.trunc] | <code>boolean</code> | truncate fractional cents. If true, an integer will be returned. |

**Example**
```js
floatToCents(1.99) === 199
```
**Example**
```js
floatToCents(8.959, { trunc: false }) === 895.9
```
