import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, CreditCard, Banknote, Building2, Send, Car as CarIcon } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Car } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  hasLicense3Years: z.enum(["oui", "non"], {
    required_error: "Veuillez sélectionner une option",
  }),
  depositMethod: z.string({
    required_error: "Veuillez sélectionner un mode de dépôt",
  }),
  selectedCar: z.string({
    required_error: "Veuillez sélectionner un véhicule",
  }),
  dateRange: z.object({
    from: z.date({ required_error: "Veuillez sélectionner une date de début" }),
    to: z.date().optional(),
  }),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  cars: Car[];
  preselectedCarId?: number;
  onSuccess?: () => void;
}

export function BookingForm({ cars, preselectedCarId, onSuccess }: BookingFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      selectedCar: preselectedCarId?.toString() || "",
    },
  });

  const hasLicense3Years = watch("hasLicense3Years");
  const depositMethod = watch("depositMethod");
  const selectedCarId = watch("selectedCar");

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          dateRange: {
            from: dateRange.from?.toISOString(),
            to: dateRange.to?.toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de la réservation");
      }

      toast({
        title: "Réservation envoyée !",
        description: "Nous vous contacterons dans les plus brefs délais.",
        variant: "default",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const depositIcons = {
    "carte-bancaire": <CreditCard className="h-4 w-4" />,
    "espece": <Banknote className="h-4 w-4" />,
    "empreinte-bancaire": <CreditCard className="h-4 w-4" />,
    "virement": <Building2 className="h-4 w-4" />,
    "vehicule-equivalent": <CarIcon className="h-4 w-4" />,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Prénom */}
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            placeholder="Votre prénom"
            {...register("firstName")}
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        {/* Nom */}
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            placeholder="Votre nom"
            {...register("lastName")}
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="votre.email@exemple.com"
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Téléphone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="06 12 34 56 78"
          {...register("phone")}
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Permis plus de 3 ans */}
      <div className="space-y-3">
        <Label>Permis de conduire depuis plus de 3 ans ? *</Label>
        <RadioGroup
          value={hasLicense3Years}
          onValueChange={(value) => setValue("hasLicense3Years", value as "oui" | "non")}
        >
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oui" id="license-oui" />
              <Label htmlFor="license-oui" className="font-normal cursor-pointer">
                Oui
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="non" id="license-non" />
              <Label htmlFor="license-non" className="font-normal cursor-pointer">
                Non
              </Label>
            </div>
          </div>
        </RadioGroup>
        {errors.hasLicense3Years && (
          <p className="text-sm text-destructive">{errors.hasLicense3Years.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="depositMethod">Moyen de dépôt de garantie *</Label>
        <Select value={depositMethod} onValueChange={(value) => setValue("depositMethod", value)}>
          <SelectTrigger className={errors.depositMethod ? "border-destructive" : ""}>
            <SelectValue placeholder="Sélectionnez un moyen de dépôt" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border">
            <SelectItem value="carte-bancaire">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Carte bancaire</span>
              </div>
            </SelectItem>
            <SelectItem value="empreinte-bancaire">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Empreinte bancaire</span>
              </div>
            </SelectItem>
            <SelectItem value="espece">
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4" />
                <span>Espèce</span>
              </div>
            </SelectItem>
            <SelectItem value="vehicule-equivalent">
              <div className="flex items-center gap-2">
                <CarIcon className="h-4 w-4" />
                <span>Véhicule équivalent</span>
              </div>
            </SelectItem>
            <SelectItem value="virement">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Virement</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.depositMethod && (
          <p className="text-sm text-destructive">{errors.depositMethod.message}</p>
        )}
      </div>

      {/* Véhicule souhaité */}
      <div className="space-y-2">
        <Label htmlFor="selectedCar">Véhicule souhaité *</Label>
        <Select value={selectedCarId} onValueChange={(value) => setValue("selectedCar", value)}>
          <SelectTrigger className={errors.selectedCar ? "border-destructive" : ""}>
            <SelectValue placeholder="Sélectionnez un véhicule" />
          </SelectTrigger>
          <SelectContent className="bg-background border border-border">
            {cars.map((car) => (
              <SelectItem key={car.id} value={car.id.toString()}>
                {car.model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.selectedCar && (
          <p className="text-sm text-destructive">{errors.selectedCar.message}</p>
        )}
      </div>

      {/* Dates souhaitées */}
      <div className="space-y-2">
        <Label>Date(s) souhaitée(s) *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground",
                errors.dateRange && "border-destructive"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd MMM yyyy", { locale: fr })} -{" "}
                    {format(dateRange.to, "dd MMM yyyy", { locale: fr })}
                  </>
                ) : (
                  format(dateRange.from, "dd MMM yyyy", { locale: fr })
                )
              ) : (
                <span>Sélectionnez une ou plusieurs dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background border border-border" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range || { from: undefined, to: undefined });
                setValue("dateRange", {
                  from: range?.from!,
                  to: range?.to,
                });
              }}
              locale={fr}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.dateRange && (
          <p className="text-sm text-destructive">
            {errors.dateRange.from?.message || "Veuillez sélectionner une date"}
          </p>
        )}
      </div>

      {/* Bouton de soumission */}
      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>Envoi en cours...</>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Envoyer la demande de réservation
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        * Champs obligatoires. Nous vous recontacterons dans les plus brefs délais pour confirmer votre réservation.
      </p>
    </form>
  );
}
