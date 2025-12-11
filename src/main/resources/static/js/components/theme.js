/**
 * ============================================================================
 * THEME MANAGER - GERENCIADOR DE TEMA CLARO/ESCURO
 * ============================================================================
 * 
 * @file        theme.js
 * @description Gerencia a alternância entre tema claro e escuro, salvando
 *              a preferência do usuário no localStorage e detectando a
 *              preferência do sistema operacional.
 * 
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     2025-12-03
 * @modified    2025-12-03
 * @version     2.0.0
 * 
 * @class       ThemeManager
 * 
 * @license     MIT
 * @copyright   2025 BRENOLIVEIRApng - Todos os direitos reservados
 * @access      Public
 * 
 * ============================================================================
 * FUNCIONALIDADES:
 * - Alternância entre tema claro e escuro
 * - Persistência da preferência no localStorage
 * - Detecção automática do tema do sistema operacional
 * - Transições suaves entre temas
 * - Sincronização em todas as páginas
 * 
 * USO:
 * - Clique no botão de tema no header
 * - Atalho: Ctrl + Shift + D (se habilitado)
 * - Tema salvo automaticamente
 * ============================================================================
 */

class ThemeManager {
    constructor() {
        this.theme = this.getTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.setupThemeToggle();
        console.log('Theme Manager inicializado - Tema atual:', this.theme);
    }

    getTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        this.theme = theme;
        localStorage.setItem('theme', theme);
        this.updateToggleButton();
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        if (typeof toast !== 'undefined') {
            toast.success(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado!`, 1500);
        }
    }

    setupThemeToggle() {
        setTimeout(() => {
            const toggleBtn = document.getElementById('themeToggle');
            if (toggleBtn) {
                toggleBtn.onclick = () => this.toggleTheme();
                this.updateToggleButton();
            }
        }, 150);
    }

    updateToggleButton() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;

        const icon = btn.querySelector('.material-symbols-outlined');
        if (!icon) return;

        if (this.theme === 'dark') {
            icon.textContent = 'light_mode';
            btn.title = 'Modo Claro';
        } else {
            icon.textContent = 'dark_mode';
            btn.title = 'Modo Escuro';
        }
    }
}

// Inicializar automaticamente
let themeManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager = new ThemeManager();
    });
} else {
    themeManager = new ThemeManager();
}

window.themeManager = themeManager;