
// const baseUrl = 'http://localhost:5250/';
const baseUrl = 'https://api.cuboapp.net/';
const scriptTag = document.currentScript;
const tenantToken = scriptTag.getAttribute("data-token");

function main() {

  document.addEventListener('DOMContentLoaded', () => {
    // sendInteractionsToOrderVtex();
    sessionHandler('normalSession');
    if (document?.getElementsByClassName('vtex-product-context-provider')) { 
      mainProductPageView()
    }
    let counter = 0;
    const renderInterval = setInterval(async () => {

      const container = document.getElementById('corel_container');
      counter++;

      if (counter > 10) {
        clearInterval(renderInterval);
        return;
      }
      if (!container) {
        return;
      }

      fetchProducts().then(promises => {
        if (
          // promises[0].status === 'fulfilled'
          true
        ) {
          renderShelf([
            {
                "id": "3e996c42-47fc-4e98-8f53-aed9b7cb628a",
                "externalId": "4180",
                "name": "Sandália Tan Caramelo Fechada Couro 37",
                "description": "Sandália em couro na cor Tan (caramelo). O modelo que envolve todo o pé com delicadeza garante conforto e estabilidade para o calce.<BR>\n<BR>\nA peça ainda conta com salto bloco médio, revestido em couro croco Tan (caramelo), e tira larga que envolve o tornozelo e possui fechamento fivela ajustável, além de abertura na parte frontal, dando um toque único para o sapato.",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/266716-100-100/https---static.jpg?v=638562454545470000",
                "uri": "/sandalia-fechada-couro-caramelo/p",
                "isActive": true,
                "show": false,
                "categories": "/6/8/10/",
                "externalProductId": "509",
                "orders": null
            },
            {
                "id": "b9e38380-6b7f-40fc-bde6-a0c5bd27fa8b",
                "externalId": "758",
                "name": "Bolsa de Ombro Pele Cobra Python Carbono e Blush UN",
                "description": "Bolsa em Pele de Cobra Python na cor blush (tom de nude) e carbono (tom de cinza) com alças de correntes douradas e fechamento por tampa e torniquete. Modelo possui duas divisórias internas e um pequeno bolso com zíper. O detalhe que encanta são os desenhos das escamas em suas formas originais, que revelam a beleza dessa rara textura e a essência da grife JORGE BISCHOFF.\r\n\u00A0\r\nDesenvolvidos com pele original de cobra Python*, os produtos da Coleção Luxo Legítimo são a escolha perfeita para produções poderosas, nobres e altamente sofisticadas.\r\n\u00A0\r\n*A matéria-prima é importada da Indonésia e da Malásia, sob licença do Ibama, com certificado de procedência e manejo sustentável. Os espécimes provêm de reservas extrativistas de mata tropical e não são criados em cativeiro. A exportação das peles é fonte de renda para os nativos, que capturam as cobras para alimentação, em processo controlado pelos órgãos ambientais internacionais. A importação para o Brasil é homologada pelo Ibama, e cada pele recebe um lacre de certificação. Este número acompanha cada produto da Coleção Luxo Legítimo.",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/162485-100-100/https---static.jpg?v=638540015210600000",
                "uri": "/-bolsa-de-ombro-pele-cobra-python-blush-nude-cabono-cinza/p",
                "isActive": true,
                "show": false,
                "categories": "/6/13/29/",
                "externalProductId": "138",
                "orders": null
            },
            {
                "id": "8042211a-5bf5-481e-bb8d-5b99b1b53d42",
                "externalId": "892",
                "name": "Cinto Branco Blanc Caramelo Reversível Couro 100",
                "description": "Cinto em couro na cor Blanc (branco) e Canela (caramelo) com fivela dourada.\n \n \nO modelo possui a opção de usar os dois lados, seja no branco ou no caramelo, garantindo versatilidade em seu uso.\n \n \nO acessório possui as iniciais JB em destaque.\n \n \nLargura: 3cm.",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/163551-100-100/https---static.jpg?v=638541748127070000",
                "uri": "/acessorio-feminino-cinto-couro-floter-fresh-blanc/p",
                "isActive": true,
                "show": false,
                "categories": "/75/83/",
                "externalProductId": "31",
                "orders": null
            },
            {
                "id": "1b9e56f8-8e09-4118-932d-c7587a3d1452",
                "externalId": "1549",
                "name": "Bota Nude Pele Cobra Python Mandala Jb 40",
                "description": "Bota com cano curto em Pele de Cobra Python na cor nude e cinza com detalhe de barbicacho em seu zíper.<BR>\r\n<BR>\r\n<BR>\r\nO modelo possui bico fino e salto bloco que garantem ainda mais sofisticação ao sapato.<BR>\r\n<BR>\r\n<BR>\r\nDesenvolvidos com pele original de cobra Python*, os produtos da Coleção Luxo Legítimo são a escolha perfeita para produções poderosas, nobres e altamente sofisticadas.<BR>\r\n<BR>\r\n<BR>\r\n*A matéria-prima é importada da Indonésia e da Malásia, sob licença do Ibama, com certificado de procedência e manejo sustentável. Os espécimes provêm de reservas extrativistas de mata tropical e não são criados em cativeiro. A exportação das peles é fonte de renda para os nativos, que capturam as cobras para alimentação, em processo controlado pelos órgãos ambientais internacionais. A importação para o Brasil é homologada pelo Ibama, e cada pele recebe um lacre de certificação. Este número acompanha cada produto da Coleção Luxo Legítimo.",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/263966-100-100/https---static.jpg?v=638562429547670000",
                "uri": "/bota-calcado-fechado-j10795015004-nude-unica/p",
                "isActive": true,
                "show": false,
                "categories": "/6/8/12/",
                "externalProductId": "360",
                "orders": null
            },
            {
                "id": "330385ff-d0ed-4ce7-8bdf-4ae8c0805fc1",
                "externalId": "1018",
                "name": "Cinto Animal Print Tortoise Preto Reversível Couro 100",
                "description": "Cinto reversível em couro na cor tartaruga (animal print) e preto com fivela dourada com as iniciais JB destacadas.<BR>\r\n <BR>\r\n <BR>\r\nO Acessório possui passante também em couro.<BR>\r\n <BR>\r\n <BR>\r\nO modelo é ideal para combinar em visuais elegantes e sofisticados, carregando o nome da marca em destaque.<BR>\r\n <BR>\r\n <BR>\r\nLargura: 3cm.",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/167526-100-100/https---static.jpg?v=638551686526530000",
                "uri": "/cinto-couro-reversivel-animal-print-preto/p",
                "isActive": true,
                "show": false,
                "categories": "/75/83/",
                "externalProductId": "209",
                "orders": null
            },
            {
                "id": "d18e1add-4e78-443b-a4d6-0f6c1524f5b5",
                "externalId": "3925",
                "name": "Sandália Meia Pata Cotton Blue Metalizado V23 40",
                "description": "Sandália em couro cotton blue (azul claro) metalizado\u00A0com\u00A0meia pata\u00A0e\u00A0salto bloco\u00A0levemente flare. O modelo traduz conforto com suas tiras arredondadas e macias que envolvem a parte superior e laterais do pé com delicadeza.<BR>\n\u00A0<BR>\nEle ainda traz outra tira que passa pelo tornozelo e conta com fivela ajustável, garantindo\u00A0funcionalidade\u00A0ao sapato.<BR>\n\u00A0<BR>\nA peça é ideal para usar em seus looks de estilo sofisticado e glam, proporcionando\u00A0brilho\u00A0e\u00A0elegância\u00A0para a sua produção.<BR>\n\u00A0<BR>\nAlerta de Tendência  os metalizados caíram no gosto das fashionistas! Ele chega em tons mais neutros e coloridos para dar aquele toque de modernidade e ousadia nas composições da temporada.",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/282450-100-100/https---static.jpg?v=638563061492670000",
                "uri": "/sandalia-couro-azul-claro-metalizado-meia-pata-v23/p",
                "isActive": true,
                "show": false,
                "categories": "/6/8/10/",
                "externalProductId": "508",
                "orders": null
            },
            {
                "id": "1aa11e75-f50c-4008-8ef2-38ba3f3589be",
                "externalId": "898",
                "name": "Cinto Preto Azul Horizon Reversível Couro 100",
                "description": "Cinto em couro na cor preto e Azul Horizon com fivela dourada.\n \n \nO modelo possui a opção de usar os dois lados, seja no preto ou no azul, garantindo versatilidade em seu uso.\n \n \nO acessório possui as iniciais JB em destaque.\n \n \nLargura: 3cm.",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/163575-100-100/https---static.jpg?v=638541748248130000",
                "uri": "/acessorio-feminino-cinto-couro-floter-fresh-preto/p",
                "isActive": true,
                "show": false,
                "categories": "/75/83/",
                "externalProductId": "32",
                "orders": null
            },
            {
                "id": "87c6f1cb-7d8f-4e66-b470-617be9b259e8",
                "externalId": "860",
                "name": "Cinto Branco Blanc Fivela Dourada Couro 100",
                "description": "Cinto em couro na cor Blanc (branco) com fivela dourada.\n \n \nO acessório possui as iniciais JB em destaque.\n \n \nLargura: 2cm.\n\nO acessório possui as iniciais JB em destaque.\n\n\nLargura 4cm..",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/162659-100-100/https---static.jpg?v=638540016383630000",
                "uri": "/-cinto-couro-blanc-branco-jb/p",
                "isActive": true,
                "show": false,
                "categories": "/75/83/",
                "externalProductId": "27",
                "orders": null
            },
            {
                "id": "25f82aac-800b-49ab-b5a6-9da1405a55e4",
                "externalId": "919",
                "name": "Cinto Preto Caramelo Anis Reversível Couro 100",
                "description": "Cinto reversível em couro na cor preto e Anis (caramelo) com fivela dourada com as iniciais JB destacadas.\n\n\nO acessório possui passante também em couro.\n\n\nO modelo é ideal para combinar em visuais elegantes e sofisticados, carregando o nome da marca em destaque.\n\n\nLargura 4cm..",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/163629-100-100/https---static.jpg?v=638541748524100000",
                "uri": "/-cinto-couro-reversivel-preto-caramelo-jb/p",
                "isActive": true,
                "show": false,
                "categories": "/75/83/",
                "externalProductId": "35",
                "orders": null
            },
            {
                "id": "1014864c-6e3c-4946-9cb8-ef037d38781b",
                "externalId": "8",
                "name": "Scarpin Cotton Blue 40",
                "description": "Scarpin em couro texturizado no tom cotton blue (azul claro). O modelo conta com bico fino e palmilha confortável com detalhe matelassê em seu interior.",
                "imageUrl": "https://jorgebischoff.vteximg.com.br/arquivos/ids/163720-100-100/https---static.jpg?v=638541749831400000",
                "uri": "/scarpin-cotton-blue/p",
                "isActive": true,
                "show": false,
                "categories": "/6/8/9/",
                "externalProductId": "163",
                "orders": null
            }
        ]);
        }
      }).then(() => {
        initializeSlider();
        observerHandler();
      });

      clearInterval(renderInterval);
    }, 1000);
  });
}
main();

//eventos de interação