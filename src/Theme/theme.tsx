export interface ThemeType {
  background: string;
  text: string;
  backButton: string;
  Habilitarbutton: string;
  Bottomtab: string;
  activeCircle: string
  carouselItem: string
  carouselText: string
  cancelButton: string
  FilterButton: string
  text2: string
  Inputborder: string
  tagBackground: string
}

export const LightTheme: ThemeType = {
  background: '#F4F4F4', //cor do fundo
  text: '#000000', // cor preta para os textos em geral
  text2: '#F4F4F4', //cor branca para os textos dos butões
  backButton: '#AAAAAA',  //Botão < Voltar
  Habilitarbutton: '#FFFFFF',// botão que habilita o dark/light theme
  Bottomtab: '#FFFFFF', // cor dao fundo da Bottomtab
  carouselItem: '#FFFFFF', // Cor do fundo de cada item do carousel
  carouselText: '#000000', // Cor do texto de cada item do carousel
  activeCircle: '#5B3CC4', //Cor do circulo quando uma das opções da tabbar é selecionada
  cancelButton: '#5B3CC4', //cor do botão "Agora Não" dos modais
  FilterButton: '#5B3CC4', //cor dos botões do filtro e do botão confirmar seleção de avatar
  Inputborder: '#5B3CC4', //cor da borda dos inputs
  tagBackground: '#E6E0F7', //fundo da tag
};

export const DarkTheme: ThemeType = {
  background: '#282828', //cor do fundo
  text: '#FFFFFF', //cor branca para os textos no geral
  text2: '#1E1E1E', //cor preta para os textos dos butões
  backButton: '#D9D9D9',    // Botão < Voltar
  Habilitarbutton:  '#1E1E1E', // botão que habilita o dark/light theme
  Bottomtab: '#1E1E1E', // cor dao fundo da Bottomtab
  carouselItem: '#1E1E1E', // Cor do fundo de cada item do carousel
  carouselText: '#F0F0F0', // Cor do texto e do icone de cada item do carousel
  activeCircle: '#552DDC', //Cor do circulo quando uma das opções da tabbar é selecionada
  cancelButton: '#552DDC', //cor do botão "Agora Não" dos modais
  FilterButton: '#552DDC', //cor dos botões do filtro e do botão confirmar seleção de avatar
  Inputborder: '#552DDC', //cor da borda dos inputs
  tagBackground: '#A393D1', //fundo da tag





};
