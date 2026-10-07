import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import ErrorPage from "./ErrorPage.tsx";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Captura errores de render/lifecycle de todo lo que envuelve y muestra
 * <ErrorPage /> en lugar de dejar la pantalla en blanco.
 *
 * Uso (src/main.tsx), por FUERA del router y de los Providers:
 *
 *   <AppErrorBoundary>
 *     <BrowserRouter>
 *       <Providers> ... </Providers>
 *     </BrowserRouter>
 *   </AppErrorBoundary>
 *
 * No captura: errores en event handlers, código asíncrono (fetch, timers)
 * ni promesas rechazadas. Esos siguen necesitando su propio try/catch.
 *
 * Ajusta el import de ErrorPage según dónde guardes los archivos.
 */
export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    /* Aquí puedes enviar el error a Sentry / tu backend. */
    console.error("Error no controlado:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return <ErrorPage error={this.state.error} />;
    }

    return this.props.children;
  }
}