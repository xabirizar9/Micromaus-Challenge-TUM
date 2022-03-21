INPUTS=protokoll.tex title.tex

all: protokoll.pdf

protokoll.pdf: $(INPUTS)

%.pdf: %.tex
	latexmk -xelatex $<

clean-figures:
	rm -f tikz/*
	rm -f protokoll.pdf protokoll.aux

clean:
	rm -f tikz/* protokoll.bbl protokoll.auxlock protokoll.run.xml
	latexmk -C
