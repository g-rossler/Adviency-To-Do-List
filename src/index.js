import { render } from "react-dom";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from "./App";
import theme from './themes/index'

const rootElement = document.getElementById("root");
render(<ChakraProvider>
	<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<App />
	</ChakraProvider>, rootElement);
