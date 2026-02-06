import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, Check, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { toast } from 'sonner';


const services = [
  { id: 1, name: 'Consulta Inicial', duration: 'Gratuita', price: 'R$ 0', description: 'Conversa sobre seu projeto' },
  { id: 2, name: 'Tattoo Pequena', duration: '1-2 horas', price: 'A partir de R$ 300', description: 'Até 10cm' },
  { id: 3, name: 'Tattoo Média', duration: '3-5 horas', price: 'A partir de R$ 600', description: '10-20cm' },
  { id: 4, name: 'Sessão Completa', duration: '6+ horas', price: 'A partir de R$ 1.200', description: 'Projetos maiores' },
];

const timeSlots = [
  '12:00', '14:00', '16:00', '18:00', '20:00'
];

const Schedule = () => {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', instagram: '', idea: '' });

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOfMonth = startOfMonth(currentMonth).getDay();

  const handleSubmit = () => {
    if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    sendToWhatsApp(); // 🔥 aqui acontece a mágica
    setStep(4);

    toast.success('Agendamento realizado com sucesso!');
  };


  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today && date.getDay() !== 0 && date.getDay() !== 1; // Closed Sunday & Monday
  };
  const sendToWhatsApp = () => {
  const phoneNumber = '554791788410'; 

  const service = services.find(s => s.id === selectedService);

  const message = `
 *Novo agendamento*

 Nome: ${formData.name}
 Email: ${formData.email}
 WhatsApp: ${formData.phone}
 Instagram: ${formData.instagram || 'Não informado'}

 Serviço: ${service?.name}
 Data: ${selectedDate && format(selectedDate, "dd/MM/yyyy")}
 Horário: ${selectedTime}

 Ideia:
${formData.idea || 'Não informada'}
  `;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};


  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-xs tracking-[0.4em] uppercase font-body">
                Agenda
              </span>
              <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-foreground">
                Marque sua <span className="text-gradient-gold">sessão</span>
              </h1>
              <p className="mt-6 text-muted-foreground font-body text-lg max-w-2xl mx-auto">
                Escolha o tipo de sessão, data e horário. 
                A primeira consulta é sempre gratuita.
              </p>
            </div>
          </ScrollReveal>

          {/* Progress - Simplified */}
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center items-center gap-2 mb-16">
              {['Serviço', 'Data', 'Dados', 'Pronto'].map((label, index) => (
                <div key={index} className="flex items-center">
                  <motion.div
                    animate={{
                      backgroundColor: step > index + 1 ? 'hsl(45 90% 55%)' : 'transparent',
                      borderColor: step >= index + 1 ? 'hsl(45 90% 55%)' : 'hsl(var(--border))',
                    }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center font-body text-xs ${
                      step >= index + 1 ? 'text-primary-foreground' : 'text-muted-foreground'
                    } ${step === index + 1 ? 'bg-gold' : ''}`}
                  >
                    {step > index + 1 ? <Check size={14} /> : index + 1}
                  </motion.div>
                  <span className={`ml-2 text-xs font-body hidden md:block ${
                    step >= index + 1 ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {label}
                  </span>
                  {index < 3 && (
                    <motion.div
                      animate={{
                        backgroundColor: step > index + 1 ? 'hsl(45 90% 55%)' : 'hsl(var(--border))',
                      }}
                      className="w-8 md:w-16 h-px mx-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-6 border cursor-pointer transition-all duration-300 ${
                        selectedService === service.id
                          ? 'border-gold bg-gold/10'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {service.name}
                        </h3>
                        <span className="text-gold font-body text-sm">
                          {service.price}
                        </span>
                      </div>
                      <p className="text-muted-foreground font-body text-sm mb-2">
                        {service.description}
                      </p>
                      <p className="text-muted-foreground/70 font-body text-xs flex items-center gap-2">
                        <Clock size={12} />
                        {service.duration}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectedService && setStep(2)}
                    disabled={!selectedService}
                    className={`px-12 py-4 font-body text-sm tracking-widest uppercase cursor-pointer transition-all ${
                      selectedService
                        ? 'bg-gold text-primary-foreground hover-glow'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    Continuar
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Calendar */}
                  <div className="border border-border p-6">
                    <div className="flex items-center justify-between mb-6">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="text-foreground hover:text-gold transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={24} />
                      </motion.button>
                      <span className="font-display text-xl font-bold text-foreground capitalize">
                        {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="text-foreground hover:text-gold transition-colors cursor-pointer"
                      >
                        <ChevronRight size={24} />
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                        <div key={i} className={`text-center font-body text-xs uppercase ${
                          i === 0 || i === 1 ? 'text-muted-foreground/50' : 'text-muted-foreground'
                        }`}>
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {days.map((day) => {
                        const available = isDateAvailable(day);
                        const selected = selectedDate && isSameDay(day, selectedDate);
                        return (
                          <motion.button
                            key={day.toISOString()}
                            whileHover={available ? { scale: 1.1 } : {}}
                            whileTap={available ? { scale: 0.95 } : {}}
                            onClick={() => available && setSelectedDate(day)}
                            disabled={!available}
                            className={`aspect-square flex items-center justify-center font-body text-sm cursor-pointer transition-all ${
                              selected
                                ? 'bg-gold text-primary-foreground'
                                : available
                                  ? 'hover:bg-gold/20 text-foreground'
                                  : 'text-muted-foreground/30 cursor-not-allowed'
                            } ${isToday(day) && !selected ? 'border border-gold' : ''}`}
                          >
                            {format(day, 'd')}
                          </motion.button>
                        );
                      })}
                    </div>
                    <p className="text-muted-foreground/60 text-xs font-body mt-4">
                      * Fechado aos domingos e segundas
                    </p>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-6">
                      Horários
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedTime(time)}
                          className={`p-4 border font-body text-left cursor-pointer transition-all flex justify-between items-center ${
                            selectedTime === time
                              ? 'border-gold bg-gold/10 text-gold'
                              : 'border-border text-foreground hover:border-gold/50'
                          }`}
                        >
                          <span>{time}</span>
                          {selectedTime === time && <Check size={16} />}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(1)}
                    className="px-8 py-4 border border-border text-foreground font-body text-sm tracking-widest uppercase cursor-pointer hover:border-gold transition-colors"
                  >
                    Voltar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectedDate && selectedTime && setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-12 py-4 font-body text-sm tracking-widest uppercase cursor-pointer transition-all ${
                      selectedDate && selectedTime
                        ? 'bg-gold text-primary-foreground hover-glow'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    Continuar
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personal Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-xl mx-auto space-y-8"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="text"
                      placeholder="Seu nome *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-secondary/50 border border-border p-4 pl-12 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="email"
                      placeholder="Seu e-mail *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-secondary/50 border border-border p-4 pl-12 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="tel"
                      placeholder="Seu WhatsApp *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-secondary/50 border border-border p-4 pl-12 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                      type="text"
                      placeholder="Seu Instagram (opcional)"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full bg-secondary/50 border border-border p-4 pl-12 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <textarea
                    placeholder="Descreva brevemente sua ideia de tattoo..."
                    value={formData.idea}
                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    rows={4}
                    className="w-full bg-secondary/50 border border-border p-4 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {/* Summary */}
                <div className="border border-gold/30 p-6 bg-gold/5 space-y-3">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Resumo
                  </h3>
                  <div className="space-y-2 text-sm font-body">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serviço:</span>
                      <span className="text-foreground">
                        {services.find(s => s.id === selectedService)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="text-foreground">
                        {selectedDate && format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="text-foreground">{selectedTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(2)}
                    className="px-8 py-4 border border-border text-foreground font-body text-sm tracking-widest uppercase cursor-pointer hover:border-gold transition-colors"
                  >
                    Voltar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-12 py-4 bg-gold text-primary-foreground font-body text-sm tracking-widest uppercase cursor-pointer hover-glow"
                  >
                    Confirmar
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-xl mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <Check size={48} className="text-primary-foreground" />
                </motion.div>

                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Tá <span className="text-gradient-gold">marcado!</span>
                </h2>
                <p className="text-muted-foreground font-body text-lg mb-8">
                  Você vai receber uma confirmação por e-mail e WhatsApp. 
                  Nos vemos em breve!
                </p>

                <div className="border border-gold/30 p-8 bg-gold/5 mb-8 text-left">
                  <div className="space-y-3 text-sm font-body">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serviço:</span>
                      <span className="text-foreground font-medium">
                        {services.find(s => s.id === selectedService)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="text-foreground font-medium">
                        {selectedDate && format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="text-foreground font-medium">{selectedTime}</span>
                    </div>
                    <div className="border-t border-border pt-3 mt-3">
                      <p className="text-muted-foreground text-xs">
                        📍 Rua Augusta, 1200 - Consolação, SP
                      </p>
                    </div>
                  </div>
                </div>

                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-12 py-4 border border-gold text-gold font-body text-sm tracking-widest uppercase cursor-pointer hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  Voltar ao Início
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Schedule;