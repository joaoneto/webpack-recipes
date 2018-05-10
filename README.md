# Webpack Recipes
Linha de comando modular e plugável para compor e executar builds webpack.
Organize em *receitas*, cada pedaço do seu build webpack.

Instalação:
```shell
npm install -g webpack-recipes
```

### Diretório de receitas:
Crie um diretório chamado *recipes* na raiz do seu projeto, assim todos os arquivos .js serão incluídos
```shell
cd /meu/projeto
mkdir recipes
```
### Receitas
As receitas devem exportar *recipe* e *webpackConfig*
```javascript
module.exports.recipe = {
  name: 'test-app',
  version: '0.0.1',
  description: 'Sample App',
  scope: 'development'
};
```

O objeto de configuração do webpack deve ser uma função que recebe *argv* como parâmetro
```javascript
module.exports.webpackConfig = function (argv) {
  return {
    entry: {
      'test-app': './test-app.js'
    },
    ...
  };
};
```
