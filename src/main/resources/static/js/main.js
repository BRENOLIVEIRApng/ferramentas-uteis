/**
 * ============================================================================
 * MAIN - INICIALIZAÇÃO E UTILITÁRIOS GLOBAIS
 * ============================================================================
 * 
 * @file        main.js
 * @description Script principal que inicializa o sistema, carrega componentes
 *              dinâmicos (header/footer) e fornece funções utilitárias globais
 *              para formatação, validação e manipulação de dados.
 * 
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    09/12/2025
 * @version     2.0.0
 * 
 * @module      Main
 * @requires    components/header.html
 * @requires    components/footer.html
 * 
 * @license     MIT
 * @access      Public
 * 
 * ============================================================================
 * UTILITÁRIOS DISPONÍVEIS:
 * - formatCPF()           - Formata CPF no padrão XXX.XXX.XXX-XX
 * - formatDate()          - Formata datas para DD/MM/YYYY
 * - formatFileSize()      - Converte bytes para formato legível
 * - copyToClipboard()     - Copia texto para área de transferência
 * - debounce()            - Debounce para eventos
 * - throttle()            - Throttle para eventos
 * - isValidEmail()        - Valida formato de email
 * - sanitizeString()      - Remove caracteres perigosos
 * 
 * COMPONENTES CARREGADOS:
 * - Header (navegação e tema)
 * - Footer (links rápidos e informações)
 * ============================================================================
 */

async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            console.warn(`Componente ${componentPath} não encontrado`);
            return;
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
            console.log(`Componente ${componentPath} carregado`);
        }
    } catch (error) {
        console.error(`Erro ao carregar ${componentPath}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Sistema de Ferramentas Úteis - Inicializado');
    
    await loadComponent('header-placeholder', 'components/header.html');
    await loadComponent('footer-placeholder', 'components/footer.html');
    
    initGlobalComponents();
    initInteractiveElements();
    initAnimations();
});

// ===== Inicialização de Componentes Globais =====
function initGlobalComponents() {
    console.log('Componentes globais carregados');
}

// ===== Inicialização de Elementos Interativos =====
function initInteractiveElements() {

    const firstInput = document.querySelector('input[type="text"]:not([readonly]), textarea:not([readonly])');
    if (firstInput) {
        firstInput.focus();
    }
    
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && submitBtn.disabled) {
                e.preventDefault();
                return false;
            }
            if (submitBtn) {
                submitBtn.disabled = true;
                setTimeout(() => {
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });
}

// ===== Inicialização de Animações =====
function initAnimations() {
    // Adiciona animações de entrada aos cards (sem aumentar tamanho ao clicar)
    const cards = document.querySelectorAll('.card, .feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===== Utilitários Globais =====

// Formatar CPF
window.formatCPF = function(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
};

// Formatar data para DD/MM/YYYY
window.formatDate = function(date) {
    if (date instanceof Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    return date;
};

// Formatar bytes para tamanho legível
window.formatFileSize = function(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Debounce function
window.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function
window.throttle = function(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Copiar texto para clipboard
window.copyToClipboard = async function(text) {
    try {
        await navigator.clipboard.writeText(text);
        if (typeof toast !== 'undefined') {
            toast.success('Copiado para a área de transferência!');
        }
        return true;
    } catch (err) {
        // Fallback para navegadores antigos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            if (typeof toast !== 'undefined') {
                toast.success('Copiado para a área de transferência!');
            }
            return true;
        } catch (err) {
            if (typeof toast !== 'undefined') {
                toast.error('Erro ao copiar texto');
            }
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
};

// Validar email
window.isValidEmail = function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Sanitizar string para uso seguro
window.sanitizeString = function(str) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return str.replace(reg, (match) => map[match]);
};

// Scroll suave para elemento
window.scrollToElement = function(element, offset = 0) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
};

// Verificar se elemento está visível no viewport
window.isInViewport = function(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Adicionar classe quando elemento entra no viewport
window.observeElement = function(element, className = 'in-view') {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
            }
        });
    });
    
    if (typeof element === 'string') {
        document.querySelectorAll(element).forEach(el => observer.observe(el));
    } else {
        observer.observe(element);
    }
};

// Gerar ID único
window.generateId = function() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Delay promise
window.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// ===== Tratamento de Erros Global =====
window.addEventListener('error', function(event) {
    console.error('Erro global capturado:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rejeitada não tratada:', event.reason);
    if (typeof toast !== 'undefined') {
        toast.error('Ocorreu um erro inesperado. Tente novamente.');
    }
});

// ===== Mensagem de Console =====
console.log('%cSistema de Ferramentas Úteis', 'color: #10b981; font-size: 20px; font-weight: bold;');
console.log('%cVersão: 2.0.0', 'color: #6b7280; font-size: 12px;');
console.log('%cDesenvolvido por BRENOLIVEIRApng', 'color: #ef4444; font-size: 12px;');

// Exportar funções para uso global
window.app = {
    formatCPF: window.formatCPF,
    formatDate: window.formatDate,
    formatFileSize: window.formatFileSize,
    copyToClipboard: window.copyToClipboard,
    debounce: window.debounce,
    throttle: window.throttle,
    isValidEmail: window.isValidEmail,
    sanitizeString: window.sanitizeString,
    scrollToElement: window.scrollToElement,
    isInViewport: window.isInViewport,
    observeElement: window.observeElement,
    generateId: window.generateId,
    sleep: window.sleep
};