import React from 'react';
import { ShieldCheck, HeartHandshake, AlertOctagon, CheckCircle2, Home, Activity } from 'lucide-react';

export const SafetyGuide: React.FC = () => {
  return (
    <div className="space-y-5 pb-20 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-stone-900">
          Guia de Segurança & Casa
        </h2>
        <p className="text-xs text-stone-600 mt-1">
          Orientações da OMS e recomendações práticas para um treino doméstico seguro e confortável.
        </p>
      </div>

      {/* Main Motto Banner */}
      <div className="p-4 bg-emerald-900 text-emerald-50 rounded-2xl space-y-1.5 shadow-xs">
        <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-semibold block">
          Princípio Fundamental
        </span>
        <h3 className="text-sm font-semibold text-white">
          Movimento controlado vale mais que velocidade.
        </h3>
        <p className="text-xs text-emerald-200/90 leading-relaxed">
          Pare imediatamente se sentir dor ou mal-estar. O objetivo da atividade física é promover força e saúde sustentável, nunca o sofrimento ou a exaustão extrema.
        </p>
      </div>

      {/* WHO / OMS Recommendations */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-800 shrink-0" />
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Recomendações da OMS
          </h4>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          A Organização Mundial da Saúde (OMS) recomenda que adultos acumulem atividade física semanal e façam fortalecimento muscular em pelo menos dois dias na semana.
        </p>
        <p className="text-xs text-stone-600 leading-relaxed">
          Este programa curto de 12 minutos é uma excelente forma de dar o primeiro passo ou complementar sua rotina diária. Ele não substitui todas as atividades físicas da vida cotidiana, mas constrói uma base sólida de força e autonomia motora.
        </p>
      </div>

      {/* Safe Home Environment Checklist */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 text-emerald-800 shrink-0" />
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Preparando o Espaço em Casa
          </h4>
        </div>

        <div className="space-y-2 text-xs text-stone-700">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Cadeira Firme:</strong> Utilize uma cadeira pesada, estável, de quatro pernas fixas. <em>Nunca use cadeiras de escritório com rodinhas</em> ou banquetas leves.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Parede Livre:</strong> Garanta um pedaço de parede livre de quadros, interruptores soltos ou objetos cortantes para apoiar as mãos na flexão e no equilíbrio.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Piso Antiderrapante:</strong> Treine com tênis firme ou descalça(o) sobre um tapete aderente/colchonete. Evite pisos escorregadios apenas de meia.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900">Respiração Contínua:</strong> Nunca prenda a respiração durante o esforço. Inspire pelo nariz e solte suavemente pela boca.
            </div>
          </div>
        </div>
      </div>

      {/* Red Flags / Sinais para Parar */}
      <div className="p-4 bg-amber-50/90 rounded-2xl border border-amber-200 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-amber-700 shrink-0" />
          <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
            Sinais de Alerta — Pare Imediatamente
          </h4>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          Interrompa a sessão se vivenciar qualquer um dos sintomas abaixo:
        </p>
        <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
          <li>Dor pontual ou aguda nas articulações ou coluna</li>
          <li>Sensação de tontura, vertigem ou visão escura</li>
          <li>Falta de ar fora do comum</li>
          <li>Pressão ou aperto no peito</li>
        </ul>
        <p className="text-[11px] text-amber-800 pt-1">
          Se qualquer sintoma persistir após o repouso, consulte uma unidade de saúde ou seu médico de confiança.
        </p>
      </div>

      {/* Scientific Clarification on Body Composition */}
      <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200/70 text-xs text-stone-600 space-y-1.5 leading-relaxed">
        <span className="font-semibold text-stone-900 block">
          Sobre a Composição Corporal & Redução Localizada
        </span>
        <p>
          Exercitar uma região muscular específica fortalece e ativa os músculos locais, mas evidências científicas e meta-análises comprovam que isso não queima a gordura seletivamente naquela área.
        </p>
        <p>
          O foco do Método Corpo Violão 21D é proporcionar condicionamento, estabilidade e bem-estar em sessões curtas e possíveis no dia a dia.
        </p>
      </div>
    </div>
  );
};
