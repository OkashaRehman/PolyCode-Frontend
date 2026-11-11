import { useDocumentThemeId } from "../../features/playground/hooks/useDocumentThemeId";
import { isLightTheme } from "../theme/themes";
import {
  definePolycodeMonacoLightTheme,
  definePolycodeMonacoTheme,
  POLYCODE_VSCODE_LIGHT_THEME,
  POLYCODE_VSCODE_THEME,
} from "../utils/monacoTheme";

export function useSiteMonacoTheme() {
  const themeId = useDocumentThemeId();
  const light = isLightTheme(themeId);

  function beforeMount(monaco) {
    definePolycodeMonacoTheme(monaco);
    definePolycodeMonacoLightTheme(monaco);
  }

  return {
    light,
    monacoTheme: light ? POLYCODE_VSCODE_LIGHT_THEME : POLYCODE_VSCODE_THEME,
    beforeMount,
  };
}
