/**
 * ============================================================================
 * CPF VALIDATOR - VALIDADOR DE CPF BRASILEIRO
 * ============================================================================
 * 
 * @file        CpfValidator.java
 * @description Utilitário para validação e formatação de CPF brasileiro
 *              usando o algoritmo oficial de dígitos verificadores.
 * 
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    09/12/2025
 * @version     2.0.0
 * 
 * @package     com.ferramentas.ferramentas.util
 * @component   Spring Component
 * @requires    Java Standard Library
 * @requires    Regular Expressions
 * @requires    String Formatting
 * @requires    Exception Handling
 * @requires    Character Utilities
 * 
 * ============================================================================
 * ALGORITMO DE VALIDAÇÃO:
 * 1. Remove caracteres não numéricos
 * 2. Verifica se possui 11 dígitos
 * 3. Rejeita sequências repetidas (111.111.111-11)
 * 4. Calcula primeiro dígito verificador
 * 5. Calcula segundo dígito verificador
 * 6. Compara com os dígitos fornecidos
 * 
 * MÉTODOS PÚBLICOS:
 * - cleanCpf(String)  - Remove formatação do CPF
 * - isValid(String)   - Valida CPF
 * - format(String)    - Formata CPF (XXX.XXX.XXX-XX)
 * 
 * REFERÊNCIA:
 * Receita Federal do Brasil - Regras de validação de CPF
 * ============================================================================
 */

package com.ferramentas.ferramentas.util;

import org.springframework.stereotype.Component;

@Component
public class CpfValidator {

    public String cleanCpf(String cpf) {
        if (cpf == null) {
            return "";
        }
        return cpf.replaceAll("\\D", "");
    }

    public boolean isValid(String cpf) {
        String cleanCpf = cleanCpf(cpf);

        if (cleanCpf.length() != 11) {
            return false;
        }

        if (cleanCpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        try {
            int sum = 0;
            for (int i = 0; i < 9; i++) {
                sum += Character.getNumericValue(cleanCpf.charAt(i)) * (10 - i);
            }
            int firstDigit = 11 - (sum % 11);
            firstDigit = (firstDigit >= 10) ? 0 : firstDigit;

            sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += Character.getNumericValue(cleanCpf.charAt(i)) * (11 - i);
            }
            int secondDigit = 11 - (sum % 11);
            secondDigit = (secondDigit >= 10) ? 0 : secondDigit;

            return cleanCpf.charAt(9) == Character.forDigit(firstDigit, 10) &&
                    cleanCpf.charAt(10) == Character.forDigit(secondDigit, 10);
        } catch (Exception e) {
            return false;
        }
    }

    public String format(String cpf) {
        String cleanCpf = cleanCpf(cpf);
        if (cleanCpf.length() != 11) {
            return cpf;
        }
        return String.format("%s.%s.%s-%s",
                cleanCpf.substring(0, 3),
                cleanCpf.substring(3, 6),
                cleanCpf.substring(6, 9),
                cleanCpf.substring(9, 11));
    }
}
