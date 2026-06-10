import { useGameStore } from '@/store/useGameStore'
import { ownerPersonalityData, getMedicine } from '@/data/gameData'
import type { ActionType } from '@/data/gameData'
import { FileText, Ban, Coins, Heart, AlertTriangle } from 'lucide-react'

const actionLabels: Record<ActionType, string> = {
  examine: '检查',
  medicate: '用药',
  inject: '打针',
  feed: '喂食',
  isolate: '隔离',
}

export default function ContractCard() {
  const activeCaseId = useGameStore(s => s.activeCaseId)
  const cases = useGameStore(s => s.cases)

  const activeCase = cases.find(c => c.id === activeCaseId)
  if (!activeCase) return null

  const contract = activeCase.contract
  const personality = ownerPersonalityData[contract.personality]

  return (
    <div className="relative overflow-hidden rounded-xl border border-yellow-700/30 bg-gray-900/60 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-orange-900/5 pointer-events-none" />
      <div className="relative p-4">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-yellow-400" />
          <h3 className="font-display text-xs tracking-widest text-yellow-400 uppercase">
            宠主委托合同
          </h3>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="text-lg">{personality.emoji}</span>
            <div>
              <div className="text-sm font-medium text-yellow-200">
                {personality.label}宠主
              </div>
              <div className="text-[10px] text-gray-500">{personality.description}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/60 border border-gray-700/30">
            <Coins className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-[10px] text-gray-400">预算</span>
            <span className="text-sm font-display text-yellow-300 ml-auto">{contract.budget} ⬡</span>
          </div>

          {contract.forbiddenActions.length > 0 && (
            <div className="p-2 rounded-lg bg-red-900/15 border border-red-800/30">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Ban className="w-3 h-3 text-red-400" />
                <span className="text-[10px] text-red-400 font-medium">禁用疗法</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {contract.forbiddenActions.map(action => (
                  <span
                    key={action}
                    className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-red-900/30 border border-red-700/30 text-red-300"
                  >
                    <Ban className="w-2.5 h-2.5" />
                    {actionLabels[action]}
                  </span>
                ))}
              </div>
            </div>
          )}

          {contract.forbiddenMedicines.length > 0 && (
            <div className="p-2 rounded-lg bg-orange-900/15 border border-orange-800/30">
              <div className="flex items-center gap-1.5 mb-1.5">
                <AlertTriangle className="w-3 h-3 text-orange-400" />
                <span className="text-[10px] text-orange-400 font-medium">禁用药品</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {contract.forbiddenMedicines.map(medId => {
                  const med = getMedicine(medId)
                  return med ? (
                    <span
                      key={medId}
                      className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-orange-900/30 border border-orange-700/30 text-orange-300"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: med.color }}
                      />
                      {med.name}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/60 border border-gray-700/30">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-[10px] text-gray-400">满意度门槛</span>
            <div className="flex-1 flex items-center gap-1.5 ml-2">
              <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-600 to-pink-400 rounded-full transition-all"
                  style={{ width: `${contract.satisfactionThreshold}%` }}
                />
              </div>
              <span className="text-[10px] text-pink-400 font-mono w-7 text-right">{contract.satisfactionThreshold}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
