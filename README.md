# A Browser Cookie

A lightweight browser cookie for frontend applications

## Installation

```bash
npm install @dbpkgs/cookie
```

or

```
yarn add @dbpkgs/cookie
```

## Usage

### Set Cookie

```ts
import cookie from '@dbpkgs/cookie'

cookie.set('COOKIE_NAME', 'COOKIE_VALUE', options)
//options are optional, check below for acceptable options
```

#### Cookie options

```ts
{
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
}
```

### Get Cookie

```ts
import cookie from '@dbpkgs/cookie'

cookie.get('COOKIE_NAME')
```

### Remove Cookie

```ts
import cookie from '@dbpkgs/cookie'

cookie.remove('COOKIE_NAME')
```

## Example Usage

```ts
import cookie from '@dbpkgs/cookie'

cookie.set('session', 'Uxc70_67gGuHHvAmTy10a', {
  expires: new Date(2022, 03, 13),
  path: '',
  secure: true
})
```
